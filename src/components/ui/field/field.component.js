import ChildComponent from '@/core/component/child.component'

import renderService from '@/core/services/render.services'

import { $X } from '@/core/xQuery/xQuery.lib'

import styles from './field.module.scss'
import template from './field.template.html'

export class Field extends ChildComponent {
  constructor({ placeholder, type = 'text', value = '', name, variant }) {
    super()
    if (!name) throw new Error('Please fill field "name"!')

    this.placeholder = placeholder
    this.type = type
    this.value = value
    this.name = name
    this.variant = variant
  }
  render() {
    this.element = renderService.htmlToElement(template, [], styles)

    const inputElement = $X(this.element).find('input').input({
      placeholder: this.placeholder,
      type: this.type,
      value: this.value,
      name: this.name
    })

    if (this.type === 'number') {
      inputElement.numberInput()
    }

    const isCreditCard = this.variant === 'credit-card'
    if (isCreditCard) {
      inputElement.creditCardInput()
    }

    return this.element
  }
}
