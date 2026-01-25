import { ValueObject } from '../../@shared/entity/value-object'
import NotificationError from '../../@shared/notification/notification.error'
import AddressValidatorFactory from '../factory/address.validator.factory'

// Value Object (is immutable)
export default class Address extends ValueObject {
  private readonly _street: string
  private readonly _number: number = 0
  private readonly _zip: string
  private readonly _city: string

  public constructor(street: string, number: number, city: string, zip: string) {
    super()
    this._street = street
    this._number = number
    this._city = city
    this._zip = zip
    this.validate()
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors())
    }
  }

  validate() {
    AddressValidatorFactory.create().validate(this)
  }

  toString() {
    return `${this._street}, ${this._number}, ${this._city}, ${this._zip}`
  }

  get street(): string {
    return this._street
  }

  get number(): number {
    return this._number
  }

  get zip(): string {
    return this._zip
  }

  get city(): string {
    return this._city
  }
}
