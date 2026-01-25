import { AgreggateRoot } from '../../@shared/entity/aggregate-root'
import Address from './address'
import CustomerAddressChangedEvent from '../event/customer-address-changed.event'
import CustomerCreatedEvent from '../event/customer-created.event'
import CustomerValidatorFactory from '../factory/customer.validator.factory'
import NotificationError from '../../@shared/notification/notification.error'

export default class Customer extends AgreggateRoot {
  private _id: string
  private _name: string
  private _address!: Address
  private _active: boolean = false
  private _rewardPoints: number = 0

  public constructor(
    id: string,
    name: string,
    address?: Address,
    active?: boolean,
    rewardPoints?: number,
  ) {
    super()
    this._id = id
    this._name = name

    if (address) {
      this._address = address
    }

    if (active) {
      this._active = active
    }

    if (rewardPoints) {
      this._rewardPoints = rewardPoints
    }

    this.validate()
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors())
    }
    this.addEvent(new CustomerCreatedEvent({ id, name }))
  }

  public static createWithoutValidate(
    id: string,
    name: string,
    address: Address,
    active: boolean,
    rewardPoints: number,
  ) {
    const customer = new Customer(id, name, address, active, rewardPoints)
    return customer
  }

  validate() {
    CustomerValidatorFactory.create().validate(this)
  }

  activate(): void {
    if (!this._address) {
      throw new Error('Address is mandatory to activate a customer')
    }

    this._active = true
  }

  deactivate(): void {
    this._active = false
  }

  addRewardPoints(points: number): void {
    this._rewardPoints += points
  }

  get isActive(): boolean {
    return this._active
  }

  set name(name: string) {
    this._name = name
    this.validate()
  }

  set address(address: Address) {
    const oldAddress = this._address
    this._address = address
    this.addEvent(
      new CustomerAddressChangedEvent({
        id: this._id,
        address: oldAddress ? oldAddress.toString() : undefined,
        newAddress: address.toString(),
      }),
    )
  }

  get address(): Address {
    return this._address
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get rewardPoints(): number {
    return this._rewardPoints
  }
}
