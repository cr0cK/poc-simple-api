import { getConnection } from '../db'
import WidgetOption from '../entities/WidgetOption'

export default class ControllerWidgetOption {
  repository = getConnection().getRepository(WidgetOption)

  /**
   * Return the options of a widget.
   */
  async getOptions(options: { widget: number }): Promise<WidgetOption[]> {
    return this.repository.find({
      select: ['key', 'value'],
      where: options,
      relations: ['optionType']
    })
  }
}
