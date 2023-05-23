import ChildComponent from '@/core/component/child.component'

import renderService from '@/core/services/render.services'
import { $X } from '@/core/xQuery/xQuery.lib'

import styles from './search.module.scss'
import template from './search.template.html'

export class Search extends ChildComponent {
  render() {
    this.element = renderService.htmlToElement(template, [], styles)

    $X(this.element).find('input').input({
      type: 'search',
      name: 'search',
      placeholder: 'Search contacts...'
    })
    return this.element
  }
}
