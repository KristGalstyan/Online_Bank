import { BaseScreen } from '@/core/component/base.screen.component'
import renderService from '@/core/services/render.services'

import styles from './home.module.scss'
import template from './home.template.html'

import { CardInfo } from './card-info/card-info.component'
import { Actions } from './actions/actions.component'

export class Home extends BaseScreen {
  constructor() {
    super('Home')
  }

  render() {
    const element = renderService.htmlToElement(
      template,
      [CardInfo, Actions],
      styles
    )

    return element
  }
}
