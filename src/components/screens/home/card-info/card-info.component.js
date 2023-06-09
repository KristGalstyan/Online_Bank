import ChildComponent from '@/core/component/child.component'
import { $X } from '@/core/xQuery/xQuery.lib'
import renderService from '@/core/services/render.services'
import { Loader } from '@/components/ui/loader/loader.component'

import Store from '@/store/store'
import { BALANCE_UPDATED } from '@/constants/event.constants'

import { formatCardNumber } from '@/utils/format/format-card-number'
import { formatToCurrency } from '@/utils/format/format-to-currency'

import { CardService } from '@/api/card.service'

import styles from './card-info.module.scss'
import template from './card-info.template.html'

const CODE = '*****'

export class CardInfo extends ChildComponent {
  constructor() {
    super()

    this.store = Store.getInstance()
    this.cardService = new CardService()

    this.element = renderService.htmlToElement(template, [], styles)

    this.#addListener()
  }

  #addListener() {
    document.addEventListener(BALANCE_UPDATED, this.#onBalanceUpdated)
  }

  #removeListener() {
    document.removeEventListener(BALANCE_UPDATED, this.#onBalanceUpdated)
  }

  destroy() {
    this.#removeListener()
  }

  #onBalanceUpdated = () => {
    this.fetchData()
  }

  #copyCardNumber(e) {
    navigator.clipboard.writeText(e.target.innerText).then(() => {
      e.target.innerText = 'Card number copied!'
      setTimeout(() => {
        e.target.innerText = formatCardNumber(this.card.number)
      }, 2000)
    })
  }

  #toggleCvc(cardCvcElement) {
    const text = cardCvcElement.text()
    text === CODE
      ? cardCvcElement.text(this.card.cvc)
      : cardCvcElement.text(CODE)
  }

  fillElements() {
    $X(this.element).html(
      renderService.htmlToElement(template, [], styles).innerHTML
    )

    $X(this.element)
      .findAll(':scope > div')
      .forEach((child) => {
        child.addClass('fade-in')
      })

    $X(this.element)
      .find('#card-number')
      .text(formatCardNumber(this.card.number))
      .click(this.#copyCardNumber.bind(this))

    $X(this.element).find('#card-expire-date').text(this.card.expireDate)

    const cardCvcElement = $X(this.element).find('#card-cvc')
    cardCvcElement.text(CODE).css('width', '44px')

    $X(this.element)
      .find('#toggle-cvc')
      .click(this.#toggleCvc.bind(this, cardCvcElement))

    $X(this.element)
      .find('#card-balance')
      .text(formatToCurrency(this.card.balance))
  }

  fetchData() {
    this.cardService.byUser((data) => {
      if (data?.id) {
        this.card = data
        this.fillElements()
        this.store.updateCard(data)
      } else {
        this.store.updateCard(null)
      }
    })
  }

  render() {
    if (this.store.state.user)
      $X(this.element).html(new Loader().render().outerHTML)
    setTimeout(() => {
      this.fetchData()
    }, 500)

    return this.element
  }
}
