import { BaseScreen } from '@/core/component/base.screen.component'

import renderService from '@/core/services/render.services'

import styles from './auth.module.scss'
import template from './auth.template.html'

import { Heading } from '@/components/ui/heading/heading.component'

export class Auth extends BaseScreen {
  constructor() {
    super('Auth')
  }
  render() {
    this.element = renderService.htmlToElement(
      template,
      [new Heading('Auth')],
      styles
    )
    return this.element
  }
}
