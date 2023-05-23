import ChildComponent from '@/core/component/child.component'

import renderService from '@/core/services/render.services'

import styles from './logo.module.scss'
import template from './logo.template.html'

export class Logo extends ChildComponent {
  render() {
    this.element = renderService.htmlToElement(template, [], styles)
    return this.element
  }
}
