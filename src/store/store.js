import { StorageService } from '@/core/services/storage.service'

// Singleton Pattern
export default class Store {
  constructor(initialState) {
    this.observers = []

    this.storageService = new StorageService()
    const savedUser = this.storageService.getItem('user')

    const state = savedUser ? { user: savedUser } : initialState

    this.state = new Proxy(state, {
      set: (target, property, value) => {
        target[property] = value
        this.notify()

        return true
      }
    })
  }

  static getInstance() {
    if (!Store.instance) {
      Store.instance = new Store({ user: null })
    }
    return Store.instance
  }

  addObserver(observer) {
    this.observers.push(observer)
  }

  removeObserver(observer) {
    this.observers = this.observers.filter((obs) => obs !== observer)
  }

  notify() {
    for (const observer of this.observers) {
      observer.update()
    }
  }

  login(user, accessToken) {
    this.state.user = user
    this.storageService.setItem('user', user)
    this.storageService.setItem('AccessToken', accessToken)
  }

  logout(user, accessToken) {
    this.state.user = null
    this.storageService.removeItem('user', user)
    this.storageService.removeItem('AccessToken', accessToken)
  }

  upDateCard(card) {
    const oldUser = this.state.user
    const newUser = { ...oldUser, card }
    this.state.user = newUser
    this.storageService.setItem('AccessToken', newUser)
  }
}
