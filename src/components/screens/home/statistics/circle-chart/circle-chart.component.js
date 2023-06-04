import ChildComponent from '@/core/component/child.component'

import renderService from '@/core/services/render.services'
import { DountChart } from '@/components/ui/dount-chart/dount-chart.component'
import styles from './circle-chart.module.scss'
import template from './circle-chart.template.html'

export class CircleChart extends ChildComponent {
  constructor(incomePercent, expensePercent) {
    super()
    this.incomePercent = incomePercent
    this.expensePercent = expensePercent
  }

  render() {
    this.element = renderService.htmlToElement(
      template,
      [
        new DountChart([
          { value: this.incomePercent, color: '#08f0c8' },
          { value: this.expensePercent, color: '#917cff' }
        ])
      ],
      styles
    )
    return this.element
  }
}
