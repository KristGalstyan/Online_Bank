import { NotificationServices } from '@/core/services/notification.services'
import { xsQuery } from '.@/core/xs-query/xs-query.lib'

export class AuthService {
  #BASE_URL = '/auth'

  constructor() {
    //store
    this.notificationService = new NotificationServices()
  }

  main(type, body) {
    return xsQuery({
      path: `${this.#BASE_URL}/${type}`,
      body,
      onSuccess: (data) => {
        // login store
        this.notificationService.show(
          'success',
          'You have successfuly logged in!'
        )
      },
      method: 'POST'
    })
  }
}
