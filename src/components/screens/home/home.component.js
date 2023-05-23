import { BaseScreen } from '@/core/component/base.screen.component'

import template from './home.template.html'
import RenderServices from '@/core/services/render.services'
import styles from './home.module.scss'
import { Field } from '@/components/ui/field/field.component'
import { UserItem } from '@/components/ui/user-item/user-item.component'

export class Home extends BaseScreen {
  constructor() {
    super('Home')
  }
  render() {
    const element = RenderServices.htmlToElement(template, [], styles)

    return element
  }
}
