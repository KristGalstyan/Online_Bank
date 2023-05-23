import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.services'

import styles from './header.module.scss'
import template from './header.template.html'
import { Logo } from './logo/logo.component'
import { LogoutButton } from './logout-button/logout-button.component'
import { Search } from './search/search.component'
import { UserItem } from '@/components/ui/user-item/user-item.component'

export class Header extends ChildComponent {
  constructor({ router }) {
    super()
    this.router = router
  }

  render() {
    this.element = renderService.htmlToElement(
      template,
      [
        Logo,
        new LogoutButton({
          router: this.router
        }),
        Search,
        new UserItem({
          avatarPath:
            'https://prisma-blog-ebon.vercel.app/blog/posts/type-safe_js_with_JsDoc.png',
          name: 'Max'
        })
      ],
      styles
    )

    return this.element
  }
}
