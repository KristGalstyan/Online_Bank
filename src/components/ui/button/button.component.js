import ChildComponent from '@/core/component/child.component'
import RenderServices from '@/core/services/render.services'

import styles from './button.module.scss'
import template from './button.template.html'
import { $X } from '@/core/xQuery/xQuery.lib'

export class Button extends ChildComponent {
  constructor({ children, onClick, variant }) {
    super()

    if (!children) throw new Error('Children is empty!')
    this.children = children
    this.onClick = onClick
    this.variant = variant
  }
  render() {
    this.element = RenderServices.htmlToElement(template, [], styles)
    $X(this.element).html(this.children).click(this.onClick)
    if (this.variant) $X(this.element).addClass(styles[this.variant])
    return this.element
  }
}
