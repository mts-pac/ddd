export default class OrderItem {
  private _id: string
  private _productId: string
  private _name: string
  private _price: number
  private _quantity: number
  private _total: number
  private _orderId: string

  constructor(id: string, name: string, price: number, productId: string, quantity: number = 1) {
    this._id = id
    this._name = name
    this._price = price
    this._quantity = quantity
    this._productId = productId
    this._total = this.price * this.quantity
    this.validate()
  }

  validate() {
    if (!this._id) {
      throw new Error('Id is required')
    }

    if (!this._name) {
      throw new Error('Name is required')
    }

    if (!this._price) {
      throw new Error('Price is required')
    }

    if (this._quantity < 0) {
      throw new Error('Quantity must be greater than zero')
    }

    if (this._price < 0) {
      throw new Error('Price must be greater than zero')
    }

    return true
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
