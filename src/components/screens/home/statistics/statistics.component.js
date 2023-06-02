import ChildComponent from '@/core/component/child.component'
import { $X } from '@/core/xQuery/xQuery.lib'
import { Heading } from '@/components/ui/heading/heading.component'
import { formatToCurrency } from '@/utils/format/format-to-currency'
import { TRANSACTION_COMPLETED } from '@/constants/event.constants'

import renderService from '@/core/services/render.services'
import { StatisticService } from '@/api/statistic.service'
import { Loader } from '@/components/ui/loader/loader.component'
import Store from '@/store/store'
import styles from './statistics.module.scss'
import template from './statistics.template.html'
import { LOADER_SELECTOR } from '@/components/ui/loader/loader.component'
import { StatisticsItem } from './statistics-item/statistics-item.component'

export class Statistics extends ChildComponent {
  constructor() {
    super()
    this.store = Store.getInstance().state
    this.statisticService = new StatisticService()

    this.element = renderService.htmlToElement(
      template,
      [new Heading('Statistics')],
      styles
    )
    this.#addListener()
  }

  #addListener() {
    document.addEventListener(
      TRANSACTION_COMPLETED,
      this.#onTransactionCompleted.bind(this)
    )
  }

  #removeListener() {
    document.removeEventListener(
      TRANSACTION_COMPLETED,
      this.#onTransactionCompleted.bind(this)
    )
  }

  destroy() {
    this.#removeListener()
  }

  #onTransactionCompleted = () => {
    this.fetchData()
  }

  fetchData() {
    this.statisticService.main((data) => {
      if (!data) return

      const loaderElement = this.element.querySelector(LOADER_SELECTOR)
      if (loaderElement) loaderElement.remove()

      const statisticsItemsElement = $X(this.element).find('#statistics-items')
      statisticsItemsElement.text('')

      /* const circleChartElement = $X(this.element).find('#circle-chart')
			circleChartElement.text('') */

      statisticsItemsElement
        .append(
          new StatisticsItem(
            'Income:',
            formatToCurrency(data[0].value),
            'green'
          ).render()
        )
        .append(
          new StatisticsItem(
            'Expense:',
            formatToCurrency(data[1].value),
            'purple'
          ).render()
        )
    })
  }

  render() {
    if (this.store.user) {
      $X(this.element).append(new Loader().render())
      this.fetchData()
    }
    return this.element
  }
}
