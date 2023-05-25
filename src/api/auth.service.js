import { NotificationServices } from '@/core/services/notification.services'
import { xsQuery } from '@/core/xs-query/xs-query.lib'
import Store from '@/store/store'
export class AuthService {
  #BASE_URL = '/auth'

  constructor() {
    this.store = Store.getInstance()
    this.notificationService = new NotificationServices()
  }

  main(type, body) {
    return xsQuery({
      path: `${this.#BASE_URL}/${type}`,
      body,
      onSuccess: (data) => {
        this.store.login(data.user, data.accessToken)
        this.notificationService.show(
          'success',
          'You have successfuly logged in!'
        )
      },
      method: 'POST'
    })
  }
}
