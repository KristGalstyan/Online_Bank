import { BaseScreen } from '@/core/component/base.screen.component'

import renderService from '@/core/services/render.services'
import { Field } from '@/components/ui/field/field.component'
import { AuthService } from '@/api/auth.service'

import styles from './auth.module.scss'
import template from './auth.template.html'
import { $X } from '@/core/xQuery/xQuery.lib'
import { Button } from '@/components/ui/button/button.component'

export class Auth extends BaseScreen {
  #isTypeLogin = true
  constructor() {
    super('Auth')
    this.authService = new AuthService()
  }

  #handleSubmit = (e) => {
    console.log(e.target)
  }

  #changeFormType(e) {
    e.preventDefault()
    $X(this.element)
      .find('h1')
      .text(this.#isTypeLogin ? 'Register' : 'Sign In')

    $X(e.target).text(this.#isTypeLogin ? 'Sign In' : 'Register')
    this.#isTypeLogin = !this.#isTypeLogin
  }

  render() {
    this.element = renderService.htmlToElement(
      template,
      [new Button({ children: 'Submit' })],
      styles
    )

    $X(this.element)
      .find('#auth-inputs')
      .append(
        new Field({
          placeholder: 'Enter email',
          name: 'email',
          type: 'email'
        }).render()
      )
      .append(
        new Field({
          placeholder: 'Enter password',
          name: 'password',
          type: 'password'
        }).render()
      )
    $X(this.element)
      .find('#change-form-type')
      .click((e) => this.#changeFormType(e))

    $X(this.element).find('form').submit(this.#handleSubmit)
    return this.element
  }
}
