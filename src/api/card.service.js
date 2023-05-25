import { NotificationServices } from '@/core/services/notification.services'
import { StorageService } from '@/core/services/storage.service'
import { xsQuery } from '.@/core/xs-query/xs-query.lib'

export class CardService {
  #BASE_URL = '/cards'

  constructor() {
    //store
    this.notificationService = new NotificationServices()
  }

  byUser() {
    return xsQuery({
      path: `${this.#BASE_URL}/by-user`,
      onSuccess
    })
  }

  upDateBalance(amount, type, onSuccess) {
    return xsQuery({
      path: `${this.#BASE_URL}/balance/${type}`,
      method: 'PATCH',
      body: { amount: +amount },
      onSuccess: () => {
        this.notificationService.show('succes', 'Balance successfuly changed!')
        onSuccess()
      }
    })
  }

  transfer({ amount, toCardNumber }, onSuccess) {
    return xsQuery({
      path: `${this.#BASE_URL}/transfer-money`,
      method: 'PATCH',
      body: {
        amount: +amount
        // fromCardNumber: this.store.user.card.number,
        // toCardNumber
      },
      onSuccess: () => {
        this.notificationService().show(
          'success',
          'Transfer successfuly completed!'
        )
        onSuccess()
      }
    })
  }
}
