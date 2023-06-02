import ChildComponent from '@/core/component/child.component'

import renderService from '@/core/services/render.services'

import template from './loader.template.html'

export const LOADER_SELECTOR = '[data-component="loader"]'

export class Loader extends ChildComponent {
  constructor(width = 100, height = 100) {
    super()
    this.width = width
    this.height = height
  }
  render() {
    this.element = renderService.htmlToElement(template, [])

    this.element.style = `width: ${this.width}px; height: ${this.height}px`
    this.element.classList.add('bounce')
    return this.element
  }
}
