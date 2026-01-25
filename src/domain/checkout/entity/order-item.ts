import { Entity } from '../../@shared/entity/entity'
import NotificationError from '../../@shared/notification/notification.error'
import OrderItemValidatorFactory from '../factory/order-item.validator.factory'

export default class OrderItem extends Entity {
  private _id: string
  private _productId: string
  private _name: string
  private _price: number
  private _quantity: number
  private _total: number
  private _orderId: string

  public constructor(
    id: string,
    name: string,
    price: number,
    productId: string,
    quantity: number = 1,
  ) {
    super()
    this._id = id
    this._name = name
    this._price = price
    this._quantity = quantity
    this._productId = productId
    this._total = this.price * this.quantity
    this.validate()
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors())
    }
  }

  validate() {
    OrderItemValidatorFactory.create().validate(this)
  }

  set orderId(orderId: string) {
    this._orderId = orderId
  }

  get id(): string {
    return this._id
  }

  get price(): number {
    return this._price
  }

  get name(): string {
    return this._name
  }

  get quantity(): number {
    return this._quantity
  }

  get total(): number {
    return this._total
  }

  get productId(): string {
    return this._productId
  }

  get orderId(): string {
    return this._orderId
  }
}
