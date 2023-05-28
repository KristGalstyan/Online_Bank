import { xsQuery } from '@/core/xs-query/xs-query.lib'

export class UserService {
  #BASE_URL = '/users'

  getAll(searchTerm, onSuccess) {
    console.log(searchTerm)
    return xsQuery({
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
