import { AgreggateRoot } from '../../@shared/entity/aggregate-root'
import NotificationError from '../../@shared/notification/notification.error'
import OrderValidatorFactory from '../factory/order.validator.factory'
import OrderItem from './order-item'

export default class Order extends AgreggateRoot {
  private _id: string
  private _customerId: string
  private _items: OrderItem[] = []
  private _total: number = 0

  public constructor(id: string, customerId: string, items: OrderItem[]) {
    super()
    this._id = id
    this._customerId = customerId
    this._items = items
    this._total = this._items.reduce((acc, item) => acc + item.total, 0)
    this.validate()
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors())
    }
  }

  validate() {
    OrderValidatorFactory.create().validate(this)
  }

  get id(): string {
    return this._id
  }

  get total(): number {
    return this._total
  }

  get items(): OrderItem[] {
    return this._items
  }

  get customerId(): string {
    return this._customerId
  }

  addItem(oi: OrderItem) {
    this._items.push(oi)
    this._total += oi.total
  }

  toJSON() {
    return {
      id: this.id,
      customerId: this.customerId,
      total: this.total,
      items: this.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        productId: item.productId,
      })),
    }
  }
}
