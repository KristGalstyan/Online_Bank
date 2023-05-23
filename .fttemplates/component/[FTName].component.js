import ChildComponent from '@/core/component/child.component'

import renderService from '@/core/services/render.services'

import styles from './[FTName].module.scss'
import template from './[FTName].template.html'


export class [FTName | pascalcase] extends ChildComponent {
render() {
    this.element = renderService.htmlToElement(template, [], styles)
    return this.element
}
}