import { Layout } from '@/components/layout/layout.component'
import { NotFound } from '@/components/screens/notFound/notFound.component'

import { $X } from '@/core/xQuery/xQuery.lib'

import { ROUTES } from './routes.data'

export class Router {
  #routes = ROUTES
  #currentRoute = null
  #layout = null

  constructor() {
    window.addEventListener('popstate', () => {
      this.#handleRouteChange()
    })

    this.#handleRouteChange()
    this.#handleLinks()
  }

  #handleLinks() {
    document.addEventListener('click', (event) => {
      const target = event.target.closest('a')

      if (target) {
        event.preventDefault()
        this.navigate(target.href)
      }
    })
  }

  getCurrentPath() {
    return window.location.pathname
  }

  navigate(path) {
    if (path !== this.getCurrentPath()) {
      window.history.pushState({}, '', path)
      this.#handleRouteChange()
    }
  }

  #handleRouteChange() {
    const path = this.getCurrentPath() || '/'
    let route = this.#routes.find((route) => route.path === path)

    if (!route) {
      route = {
        component: NotFound
      }
    }

    this.#currentRoute = route
    this.#render()
  }

  #render() {
    const component = new this.#currentRoute.component().render()

    if (!this.#layout) {
      this.#layout = new Layout({
        router: this,
        children: component
      }).render()

      $X('#app').html('').append(this.#layout)
    } else {
      $X('#content').html('').append(component)
    }
  }
}
