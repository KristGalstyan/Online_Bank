import ChildComponent from '@/core/component/child.component'

import renderService from '@/core/services/render.services'

import { $X } from '@/core/xQuery/xQuery.lib'

import styles from './heading.module.scss'
import template from './heading.template.html'

export class Heading extends ChildComponent {
  constructor(title = '') {
    super()
    this.title = title
  }
  render() {
    this.element = renderService.htmlToElement(template, [], styles)
    $X(this.element).text(this.title)
    return this.element
  }
}
