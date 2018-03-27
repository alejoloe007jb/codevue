export var isElement = function isElement (el) {
  return el && el.nodeType === Node.ELEMENT_NODE
}

export const addClass = (el, className) => {
  if (className && isElement(el)) {
    el.classList.add(className)
  }
}

export const removeClass = (el, className) => {
  if (className && isElement(el)) {
    el.classList.remove(className)
  }
}
