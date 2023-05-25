import { xsQuery } from '.@/core/xs-query/xs-query.lib'

export class UserService {
  #BASE_URL = '/users'

  getAll(searchTerm, onSuccess) {
    return redQuery({
      path: `${this.#BASE_URL}${
        searchTerm
          ? `?${new URLSearchParams({
              searchTerm
            })}`
          : ''
      }`,
      onSuccess
    })
  }
}
