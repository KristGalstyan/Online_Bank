import { formatCardNumberWithDashes } from '@/utils/format/format-card-number'

/**
 * Represents the XQuery class for working with DOM elements.
 */
class XQuery {
  /**
   * Create a new XQuery instance.
   * @param {string|HTMLElement} selector - A CSS selector string or an HTMLElement.
   */
  constructor(selector) {
    if (typeof selector === 'string') {
      this.element = document.querySelector(selector)

      if (!this.element) {
        throw new Error(`Element ${selector} not found!`)
      }
    } else if (selector instanceof HTMLElement) {
      this.element = selector
    } else {
      throw new Error('Invalid selector type')
    }
  }

  click(callback) {
    this.element.addEventListener('click', callback)
    return this
  }

  /**
   * STYLES
   */
  input({ onInput, ...rest }) {
    if (this.element.tagName.toLowerCase() === 'INPUT') {
      throw new Error('Element must be an input')
    }
    for (const [key, value] of Object.entries(rest)) {
      this.element.setAttribute(key, value)
    }
    if (onInput) {
      this.element.addEventListener('input', onInput)
    }
    return this
  }

  text(textContent) {
    if (typeof textContent === 'undefined') {
      return this.element.textContent
    } else {
      this.element.textContent = textContent
      return this
    }
  }

  attr(attributeName, value) {
    if (typeof attributeName !== 'string') {
      throw new Error('attribute name must be a string')
    }
    if (typeof value === 'undefined') {
      return this.element.getAttribute(attributeName)
    } else {
      this.element.setAttribute(attributeName, value)
      return this
    }
  }

  numberInput(limit) {
    if (
      this.element.tagName.toLowerCase() !== 'input' ||
      this.element.type !== 'number'
    )
      throw new Error('Element must be an input with type "number"')

    this.element.addEventListener('input', (e) => {
      let value = e.target.value.replace(/[^0-9]/g, '')
      if (limit) value = value.substring(0, limit)
      e.target.value = value
    })
    return this
  }

  creditCardInput() {
    const limit = 16
    if (
      this.element.tagName.toLowerCase() !== 'input' ||
      this.element.type !== 'text'
    )
      throw new Error('Element must be an input with type "text"')

    this.element.addEventListener('input', (e) => {
      let value = e.target.value.replace(/[^0-9]/g, '')
      if (limit) value = value.substring(0, limit)
      e.target.value = formatCardNumberWithDashes(value)
    })
    return this
  }

  /**
   * Find the first element that matches the specified selector within the selected element.
   * @param {string} selector - A CSS selector string to search for within the selected element.
   * @returns {XQuery} A new XQuery instance for the found element.
   */
  find(selector) {
    const element = new XQuery(this.element.querySelector(selector))

    if (element) {
      return element
    } else {
      throw new Error(`Element ${selector} not found!`)
    }
  }

  /**
   * Append a new element as a child of the selected element.
   * @param {HTMLElement} childElement - The new child element to append.
   * @returns {XQuery} The current XQuery instance for chaining.
   */
  append(childElement) {
    this.element.appendChild(childElement)
    return this
  }

  /**
   * Insert a new element before the selected element.
   * @param {HTMLElement} newElement - The new element to insert before the selected element.
   * @returns {XQuery} The current XQuery instance for chaining.
   */
  before(newElement) {
    if (!(newElement instanceof HTMLElement)) {
      throw new Error('Element must be an HTMLElement')
    }

    const parentElement = this.element.parentElement

    if (parentElement) {
      parentElement.insertBefore(newElement, this.element)
      return this
    } else {
      throw new Error('Element does not have a parent element')
    }
  }

  /**
   * Get or set the inner HTML of the selected element.
   * @param {string} [htmlContent] - Optional HTML content to set. If not provided, the current inner HTML will be returned.
   * @returns {XQuery|string} The current XQuery instance for chaining when setting HTML content, or the current inner HTML when getting.
   */
  html(htmlContent) {
    if (typeof htmlContent === 'undefined') {
      return this.element.innerHTML
    } else {
      this.element.innerHTML = htmlContent
      return this
    }
  }

  /**
   * Set the CSS style of the selected element.
   * @param {string} property - The CSS property to set.
   * @param {string} value - The value to set for the CSS property.
   * @returns {XQuery} The current XQuery instance for chaining.
   */
  css(property, value) {
    if (typeof property !== 'string' || typeof value !== 'string') {
      throw new Error('property and value must be strings')
    }

    this.element.style[property] = value
    return this
  }

  addClass(classNames) {
    if (Array.isArray(classNames)) {
      for (const className of classNames) {
        this.element.classList.add(className)
      }
    } else {
      this.element.classList.add(classNames)
    }
    return this
  }

  removeClass(classNames) {
    if (Array.isArray(classNames)) {
      for (const className of classNames) {
        this.element.classList.remove(className)
      }
    } else {
      this.element.classList.remove(classNames)
    }
    return this
  }
}

/**
 * Create a new XQuery instance for the given selector.
 * @param {string|HTMLElement} selector - A CSS selector string or an HTMLElement.
 * @returns {XQuery} A new XQuery instance for the given selector.
 */
export function $X(selector) {
  return new XQuery(selector)
}
