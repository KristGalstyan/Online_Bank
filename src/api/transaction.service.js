import { xsQuery } from '@/core/xs-query/xs-query.lib'

export class TransactionService {
  #BASE_URL = '/transactions'

  getAll(onSuccess) {
    return xsQuery({
      path:
        this.#BASE_URL +
        `?${new URLSearchParams({
          orderBy: 'desc'
        })}`,
      onSuccess
    })
  }
}
