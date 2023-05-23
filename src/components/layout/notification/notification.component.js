import ChildComponent from '@/core/component/child.component'

import renderService from '@/core/services/render.services'

import styles from './notification.module.scss'
import template from './notification.template.html'
import { notificationservices } from '@/core/services/notification.services'

export class Notification extends ChildComponent {
  render() {
    this.element = renderService.htmlToElement(template, [], styles)
    window.notification = new notificationservices()
    return this.element
  }
}
