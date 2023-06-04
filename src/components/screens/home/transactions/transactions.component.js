import ChildComponent from '@/core/component/child.component'

import renderService from '@/core/services/render.services'
import { $X } from '@/core/xQuery/xQuery.lib'
import { Loader } from '@/components/ui/loader/loader.component'

import styles from './transactions.module.scss'
import { LOADER_SELECTOR } from '@/components/ui/loader/loader.component'
import template from './transactions.template.html'
import Store from '@/store/store'
import { TransactionService } from '@/api/transaction.service'
import { TRANSACTION_COMPLETED } from '@/constants/event.constants'
import { Heading } from '@/components/ui/heading/heading.component'
import { TransactionItem } from '@/components/screens/home/transactions/transaction-item/transaction-item.component'

export class Transactions extends ChildComponent {
  constructor() {
    super()
    this.store = Store.getInstance().state
    this.transactionService = new TransactionService()

    this.element = renderService.htmlToElement(
      template,
      [new Heading('Recent transactions')],
      styles
    )
    this.#addListener()
  }
  #addListener() {
    document.addEventListener(
      TRANSACTION_COMPLETED,
      this.#onTransactionCompleted
    )
  }

  #removeListener() {
    document.removeEventListener(
      TRANSACTION_COMPLETED,
      this.#onTransactionCompleted
    )
  }

  destroy() {
    this.#removeListener()
  }

  #onTransactionCompleted = () => {
    this.fetchData()
  }

  fetchData() {
    this.transactionService.getAll((data) => {
      if (!data) return

      const loaderElement = this.element.querySelector(LOADER_SELECTOR)
      if (loaderElement) loaderElement.remove()

      const transactionsList = $X(this.element).find('#transactions-list')

      if (data.length) {
        for (const transaction of data.transactions) {
          transactionsList.append(new TransactionItem(transaction).render())
        }
      } else {
        transactionsList.text('Transactions not found!')
      }
    })
  }

  render() {
    if (this.store.user) {
      $X(this.element).append(new Loader().render())
      setTimeout(() => {
        this.fetchData()
      }, 500)
    }

    return this.element
  }
}
