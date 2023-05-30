import ChildComponent from '@/core/component/child.component'
import Store from '@/store/store'
import { NotificationServices } from '@/core/services/notification.services'
import { $X } from '@/core/xQuery/xQuery.lib'
import { Button } from '@/components/ui/button/button.component'
import renderService from '@/core/services/render.services'
import { CardService } from '@/api/card.service'
import styles from './actions.module.scss'
import template from './actions.template.html'
import { Field } from '@/components/ui/field/field.component'
import validationService from '@/core/services/validation.service'
import { BALANCE_UPDATED } from '@/constants/event.constants'

export class Actions extends ChildComponent {
  constructor() {
    super()

    this.store = Store.getInstance().state
    this.cardService = new CardService()
    this.notificationService = new NotificationServices()
  }

  updateBalance(event, type) {
    event.preventDefault()

    if (!this.store.user) {
      this.notificationService.show('error', 'You need authorization!')
    }

    $X(event.target).text('Sending...').attr('disabled', true)

    const inputElement = $X(this.element).find('input')
    const amount = inputElement.value()

    if (!amount) {
      validationService.showError($X(this.element).find('label'))
      return
    }

    this.cardService.upDateBalance(amount, type, () => {
      inputElement.value('')

      const balanceUpdatedEvent = new Event(BALANCE_UPDATED)
      document.dispatchEvent(balanceUpdatedEvent)
    })

    $X(event.target).removeAttr('disabled').text(type)
  }

  render() {
    this.element = renderService.htmlToElement(
      template,
      [
        new Field({
          name: 'amount',
          placeholder: 'Enter Amount:',
          type: 'number'
        })
      ],
      styles
    )
    $X(this.element)
      .find('#action-buttons')
      .append(
        new Button({
          children: 'Top-up',
          variant: 'green',
          onClick: (e) => this.updateBalance(e, 'top-up')
        }).render()
      )
      .append(
        new Button({
          children: 'Withdrawal',
          variant: 'purple',
          onClick: (e) => this.updateBalance(e, 'withdrawal')
        }).render()
      )

    return this.element
  }
}
