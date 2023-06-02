import ChildComponent from '@/core/component/child.component'

import renderService from '@/core/services/render.services'

import ValidationService from '@/core/services/validation.service'
import styles from './transfer-field.module.scss'
import template from './transfer-field.template.html'
import { $X } from '@/core/xQuery/xQuery.lib'

import { Field } from '@/components/ui/field/field.component'
import { Button } from '@/components/ui/button/button.component'

import {
  TRANSACTION_COMPLETED,
  BALANCE_UPDATED
} from '@/constants/event.constants'

import Store from '@/store/store'
import { CardService } from '@/api/card.service'
import { NotificationServices } from '@/core/services/notification.services'

export class TransferField extends ChildComponent {
  constructor() {
    super()
    this.store = Store.getInstance().state
    this.cardService = new CardService()
    this.notificationServices = new NotificationServices()
  }

  handleTransfer = (event) => {
    event.preventDefault()

    if (!this.store.user) {
      this.notificationServices.show('error', 'You need authorization!')
    }

    $X(event.target).text('Sending...').attr('disabled', true)

    const inputElement = $X(this.element).find('input')
    const toCardNumber = inputElement.value().replaceAll('-', '')

    const reset = () => {
      $X(event.target).removeAttr('disabled').text('Send')
    }
    if (!toCardNumber) {
      ValidationService.showError($X(this.element).find('label'))
      reset()
      return
    }

    let amount = prompt('Transfer amount ')
    this.cardService.transfer({ amount, toCardNumber }, () => {
      inputElement.value('')
      amount = ''

      document.dispatchEvent(new Event(TRANSACTION_COMPLETED))
      document.dispatchEvent(new Event(BALANCE_UPDATED))
    })
    reset()
  }

  render() {
    this.element = renderService.htmlToElement(
      template,
      [
        new Field({
          name: 'card-number',
          placeholder: 'xxxx-xxxx-xxxx-xxxx',
          variant: 'credit-card'
        }),
        new Button({
          children: 'Send',
          variant: 'purple',
          onClick: this.handleTransfer
        })
      ],
      styles
    )
    return this.element
  }
}
