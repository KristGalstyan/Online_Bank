import ChildComponent from '@/core/component/child.component'

import renderService from '@/core/services/render.services'
import { $X } from '@/core/xQuery/xQuery.lib'

import { Loader } from '@/components/ui/loader/loader.component'
import Store from '@/store/store'
import { UserService } from '@/api/user.service'
import styles from './contacts.module.scss'
import template from './contacts.template.html'
import { TransferField } from './transfer-field/transfer-field.component'
import { Heading } from '@/components/ui/heading/heading.component'
import { LOADER_SELECTOR } from '@/components/ui/loader/loader.component'

import { UserItem } from '@/components/ui/user-item/user-item.component'
import { formatCardNumberWithDashes } from '@/utils/format/format-card-number'

export class Contacts extends ChildComponent {
  constructor() {
    super()
    this.store = Store.getInstance().state
    this.userService = new UserService()
  }

  fetchData() {
    this.userService.getAll(null, (data) => {
      if (!data) return

      this.element.querySelector(LOADER_SELECTOR).remove()

      for (const user of data) {
        $X(this.element)
          .find('#contacts-list')
          .append(
            new UserItem(user, true, () => {
              $X('[name="card-number"]').value(
                formatCardNumberWithDashes(user.card.number)
              )
            }).render()
          )
      }

      $X(this.element)
        .find('#contacts-list')
        .findAll('button')
        .forEach((contactElement) => {
          contactElement.addClass('fade-in')
        })
    })
  }

  render() {
    this.element = renderService.htmlToElement(
      template,
      [TransferField, new Heading('Transfer money')],
      styles
    )

    if (this.store.user) {
      $X(this.element)
        .find('#contacts-list')
        .html(new Loader().render().outerHTML)

      this.fetchData()
    }

    return this.element
  }
}
