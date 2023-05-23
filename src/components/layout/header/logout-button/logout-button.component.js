import ChildComponent from '@/core/component/child.component'

import renderService from '@/core/services/render.services'
import { $X } from '@/core/xQuery/xQuery.lib'

import styles from './logout-button.module.scss'
import template from './logout-button.template.html'

export class LogoutButton extends ChildComponent {
  constructor({ router }) {
    super()

    this.router = router
  }

  render() {
    this.element = renderService.htmlToElement(template, [], styles)
    $X(this.element)
      .find('button')
      .click(() => {
        this.router.navigate('/auth')
      })

    return this.element
  }
}
