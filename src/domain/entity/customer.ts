import Address from './address'

export default class Customer {
  private _id: string
  private _name: string
  private _address!: Address
  private _active: boolean = false
  private _rewardPoints: number = 0

  constructor(id: string, name: string) {
    this._id = id
    this._name = name

    this.validate()
  }

  validate() {
    if (!this._name || this._name.length === 0) {
      throw new Error('Name is required')
    }

    if (!this._id) {
      throw new Error('Id is required')
    }

    return true
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
    this._address = address
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
