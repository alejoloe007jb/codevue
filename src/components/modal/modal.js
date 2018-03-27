import { addClass, removeClass } from '@/utils/dom'
import cvButton from '@/components/shared/button/button'

export default {
  components: { cvButton },
  render (h) {
    const t = this
    const $slots = t.$slots
    let header = h(false)
    if (!t.hideHeader) {
      let modalHeader = $slots['modal-header']
      if (!modalHeader) {
        let closeButton = h(false)
        if (!t.hideHeaderClose) {
          closeButton = h(
            'button',
            {
              class: ['close'],
              domProps: {innerHTML: '<span>×</span>'},
              on: {
                click: evt => {
                  t.hide('header-close')
                }
              }
            },
            [$slots['modal-header-close']]
          )
        }
        modalHeader = [
          h(t.titleTag, { class: ['modal-title'] }, [
            $slots['modal-title'] || t.title
          ]),
          closeButton
        ]
      }
      header = h(
        'div',
        {
          class: t.headerClasses
        },
        [modalHeader]
      )
    }
    const body = h(
      'div',
      {
        class: t.bodyClasses
      },
      [$slots.default]
    )

    let footer = h(false)
    if (!t.hideFooter) {
      let modalFooter = $slots['modal-footer']
      if (!modalFooter) {
        let okButton = h(false)
        if (!t.okOnly) {
          okButton = h(
            'cv-button',
            {
              props: {
                theme: t.theme
              },
              nativeOn: {
                click: evt => {
                  t.hide('ok')
                }
              }
            },
            [$slots['modal-ok'] || t.okTitle]
          )
        }
        const cancelButton = h(
          'cv-button',
          {
            nativeOn: {
              click: evt => {
                t.hide('cancel')
              }
            }
          },
          [$slots['modal-cancel'] || t.cancelTitle]
        )
        modalFooter = [okButton, cancelButton]
      }
      footer = h(
        'div',
        {
          class: t.footerClasses
        },
        [modalFooter]
      )
    }

    const modalContent = h(
      'div',
      {
        ref: 'content',
        class: ['modal-content'],
        attrs: {
          tabindex: '-1'
        },
        on: {
          focusout: t.onFocusout,
          click: evt => {
            evt.stopPropagation()
          }
        }
      },
      [header, body, footer]
    )

    const modalDialog = h('div', { class: t.dialogClasses }, [modalContent])

    let backdrop = h(false)

    if (t.isShow) {
      backdrop = h('div', {
        class: t.backdropClasses
      })
    }

    const modal = h(
      'div',
      {
        ref: 'modal',
        class: t.modalClasses,
        attrs: {
          role: 'dialog',
          'aria-hidden': t.isShow ? null : 'true'
        },
        on: {
          click: t.onClickOut,
          keydown: t.onEsc
        }
      },
      [modalDialog]
    )

    return h(
      'div',
      {
      },
      [modal, backdrop]
    )
  },
  data () {
    return {
      isShow: false
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    titleTag: {
      type: String,
      default: 'h4'
    },
    theme: {
      type: String,
      default: null
    },
    noFade: {
      type: Boolean,
      default: false
    },
    animate: {
      type: String,
      default: null
    },
    isFill: {
      type: Boolean,
      default: false
    },
    isSimple: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: null
    },
    size: {
      type: String,
      default: null
    },
    headerClass: {
      type: [String, Array],
      default: null
    },
    bodyClass: {
      type: [String, Array],
      default: null
    },
    footerClass: {
      type: [String, Array],
      default: null
    },
    hideHeader: {
      type: Boolean,
      default: false
    },
    hideFooter: {
      type: Boolean,
      default: false
    },
    hideHeaderClose: {
      type: Boolean,
      default: false
    },
    okOnly: {
      type: Boolean,
      default: false
    },
    okTitle: {
      type: String,
      default: 'OK'
    },
    cancelTitle: {
      type: String,
      default: 'Cancel'
    }
  },
  computed: {
    modalClasses () {
      return [
        'modal',
        {
          fade: !this.noFade,
          [`modal-${this.animate}`]: Boolean(this.animate),
          'modal-fill-in': this.isFill,
          [`modal-${this.theme}`]: Boolean(this.theme),
          'show': this.isShow
        }
      ]
    },
    dialogClasses () {
      return [
        'modal-dialog',
        {
          'modal-simple': this.isSimple,
          [`modal-${this.position}`]: Boolean(this.position),
          [`modal-${this.size}`]: Boolean(this.size)
        }
      ]
    },
    headerClasses () {
      return [
        'modal-header',
        this.headerClass
      ]
    },
    bodyClasses () {
      return [
        'modal-body',
        this.bodyClass
      ]
    },
    footerClasses () {
      return [
        'modal-footer',
        this.footerClass
      ]
    },
    backdropClasses () {
      return [
        'modal-backdrop',
        'fade',
        'show'
      ]
    }
  },
  watch: {
  },
  methods: {
    show () {
      this.isShow = true
      addClass(document.body, 'modal-open')
      this.$refs.modal.style.display = 'block'
      this.$refs.content.focus()
    },
    hide (trigger) {
      const t = this
      if (!t.isShow) {
        return
      }
      this.$emit(trigger)
      t.isShow = false
      setTimeout(function () {
        removeClass(document.body, 'modal-open')
        t.$refs.modal.style.display = 'none'
      }, 300)
    },
    onFocusout (evt) {
      const content = this.$refs.content
      if (this.isShow && content && !content.contains(evt.relatedTarget)) {
        content.focus()
      }
    },
    onClickOut () {
      if (this.isShow) {
        this.hide('backdrop')
      }
    },
    onEsc (evt) {
      if (evt.keyCode === 27 && this.isShow) {
        this.hide('esc')
      }
    }
  }
}
