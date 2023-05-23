import ChildComponent from '@/core/component/child.component'

import renderService from '@/core/services/render.services'
import { $X } from '@/core/xQuery/xQuery.lib'

import styles from './user-item.module.scss'
import template from './user-item.template.html'

export class UserItem extends ChildComponent {
  constructor(user, isGray = false, onClick) {
    super()
    if (!user) throw new Error('User should be passed!')
    if (!user?.name) throw new Error("User must be have a 'name'!")
    if (!user?.avatarPath) throw new Error('User must have a "avatarPath"!')

    this.user = user
    this.onClick = onClick
    this.isGray = isGray
  }

  #preventDefault(e) {
    e.preventDefault()
  }

  upDate({ avatarPath, name }) {
    if (avatarPath && name) {
      $X(this.element).find('img').attr('src', avatarPath).attr('alt', name)
      $X(this.element).find('span').text(name)
    }
  }

  render() {
    this.element = renderService.htmlToElement(template, [], styles)
    this.upDate(this.user)

    $X(this.element).click(this.onClick || this.#preventDefault.bind(this))

    if (!this.onClick) $X(this.element).attr('disabled', '')
    if (this.isGray) $X(this.element).addClass(styles.gray)
    return this.element
  }
}
