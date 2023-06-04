import { BaseScreen } from '@/core/component/base.screen.component'
import renderService from '@/core/services/render.services'

import styles from './home.module.scss'
import { $X } from '@/core/xQuery/xQuery.lib'
import template from './home.template.html'
import { AuthRequiredMessage } from '@/components/ui/auth-required-message/auth-required-message.component'
import { CardInfo } from './card-info/card-info.component'
import { Actions } from './actions/actions.component'
import { Contacts } from './contacts/contacts.component'
import { Transactions } from './transactions/transactions.component'
import { Statistics } from './statistics/statistics.component'

import Store from '@/store/store'

export class Home extends BaseScreen {
  constructor() {
    super('Home')
    this.store = Store.getInstance()
    this.store.addObserver(this)

    this.components = {
      cardInfo: null,
      transactions: null,
      statistics: null
    }
  }

  createOrUpdateComponent(component, componentName) {
    if (this.components[componentName]) {
      this.components[componentName].destroy()
    }
    this.components[componentName] = new component()
    return this.components[componentName]
  }

  update() {
    this.user = this.store.state.user

    if (!this.user) {
      $X(this.element).html(new AuthRequiredMessage().render().outerHTML)
    }
  }

  render() {
    const componentsToRender = [
      this.createOrUpdateComponent(CardInfo, 'cardInfo'),
      this.createOrUpdateComponent(Transactions, 'transactions'),
      this.createOrUpdateComponent(Statistics, 'statistics'),
      Actions,
      Contacts
    ]
    this.element = renderService.htmlToElement(
      template,
      componentsToRender,
      styles
    )
    this.update()
    return this.element
  }
}
