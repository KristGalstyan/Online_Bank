import { NotificationServices } from '@/core/services/notification.services'
import { xsQuery } from '@/core/xs-query/xs-query.lib'
import Store from '@/store/store'

export class CardService {
  #BASE_URL = '/cards'

  constructor() {
    this.store = Store.getInstance().state

    this.notificationService = new NotificationServices()
  }

  byUser(onSuccess) {
    return xsQuery({
      path: `${this.#BASE_URL}/by-user`,
      onSuccess
    })
  }

  /**
   * Updates the user's balance with the specified amount and type.
   *
   * @param {number} amount - The amount to be added or withdrawn from the user's balance.
   * @param {'top-up' | 'withdrawal'} type - The type of the transaction, either "top-up" or "withdrawal".
   * @param {function} onSuccess - The callback function to be executed when the balance update is successful.
   * @returns {Promise} A Promise object that resolves to the response from the API.
   */
  upDateBalance(amount, type, onSuccess) {
    return xsQuery({
      path: `${this.#BASE_URL}/balance/${type}`,
      method: 'PATCH',
      body: { amount: +amount },
      onSuccess: () => {
        this.notificationService.show(
          'success',
          'Balance successfully changed!'
        )
        onSuccess()
      }
    })
  }

  /**
   * Transfers money between two card numbers.
   *
   * @function
   * @param {Object} body - The transfer details.
   * @param {number} body.amount - The amount to be transferred.
   * @param {string} body.toCardNumber - The recipient's card number.
   * @param {Function} onSuccess - The callback function to be executed upon successful transfer.
   * @returns {Promise} A promise that resolves with the redQuery response.
   */
  transfer({ amount, toCardNumber }, onSuccess) {
    return xsQuery({
      path: `${this.#BASE_URL}/transfer-money`,
      method: 'PATCH',
      body: {
        amount: +amount,
        fromCardNumber: this.store.user.card.number,
        toCardNumber
      },
      onSuccess: () => {
        this.notificationService.show(
          'success',
          'Transfer successfully completed!'
        )
        onSuccess()
      }
    })
  }
}
