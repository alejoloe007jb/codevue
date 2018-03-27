export default {
  render (h) {
    const t = this
    const $slots = t.$slots
    return h(
      'button',
      {
        class: t.buttonClasses,
        attrs: {
          type: 'button',
          disabled: t.disabled
        }
      },
      [$slots.default]
    )
  },
  props: {
    theme: {
      type: String,
      default: 'default'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isBlock: {
      type: Boolean,
      default: false
    },
    isOutline: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: null
    },
    isDirection: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: 'up'
    },
    isAnimate: {
      type: Boolean,
      default: false
    },
    animate: {
      type: String,
      default: 'side'
    },
    floating: {
      type: Boolean,
      default: false
    },
    isRound: {
      type: Boolean,
      default: false
    },
    pill: {
      type: String,
      default: 'left'
    },
    isSquared: {
      type: Boolean,
      default: false
    },
    isIcon: {
      type: Boolean,
      default: false
    },
    isPure: {
      type: Boolean,
      default: false
    },
    isTagged: {
      type: Boolean,
      default: false
    },
    socialIcon: {
      type: String,
      default: null
    }
  },
  computed: {
    buttonClasses () {
      return [
        'btn',
        {
          'btn-block': this.isBlock,
          'btn-outline': this.isOutline,
          [`btn-${this.size}`]: Boolean(this.size),
          'btn-direction': this.isDirection,
          [`btn-${this.direction}`]: this.isDirection,
          'btn-animate': this.isAnimate,
          [`btn-animate-${this.animate}`]: this.isAnimate,
          'btn-floating': this.floating,
          'btn-round': this.isRound,
          [`btn-pill-${this.pill}`]: this.isRound,
          'btn-squared': this.isSquared,
          [`btn-${this.theme}`]: Boolean(this.theme),
          'btn-icon': this.isIcon,
          'btn-pure': this.isPure,
          'btn-tagged': this.isTagged,
          [`social-${this.socialIcon}`]: this.isTagged || this.isIcon
        }
      ]
    }
  }
}
