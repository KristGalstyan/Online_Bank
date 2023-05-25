import { xsQuery } from '.@/core/xs-query/xs-query.lib'

export class StatisticService {
  #BASE_URL = '/statistics'

  main(onSuccess) {
    return xsQuery({
      path: this.#BASE_URL,
      onSuccess
    })
  }
}
