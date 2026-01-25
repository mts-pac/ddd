import { AgreggateRoot } from '../../@shared/entity/aggregate-root'
import NotificationError from '../../@shared/notification/notification.error'
import ProductCreatedEvent from '../event/product-created.event'
import ProductYupValidatorFactory from '../factory/product.validator.factory'

export default class Product extends AgreggateRoot {
  private _id: string
  private _name: string
  private _price: number

  constructor(id: string, name: string, price: number) {
    super()
    this._id = id
    this._name = name
    this._price = price
    this.validate()
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors())
    }
    this.addEvent(new ProductCreatedEvent({ id, name, price }))
  }

  validate() {
    ProductYupValidatorFactory.create().validate(this)
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get price(): number {
    return this._price
  }

  set name(name: string) {
    this._name = name
    this.validate()
  }

  set price(price: number) {
    this._price = price
    this.validate()
  }
}
