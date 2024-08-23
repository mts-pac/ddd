import OrderItem from "./order-item";

export default class Order {
  private _id: string;
  private _customerId: string;
  private _items: OrderItem[] = [];
  private _total: number = 0;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this._items.reduce((acc, item) => acc + item.total, 0);
    this.validate();
  }

  validate() {
    if (!this._id) {
      throw new Error("Id is required");
    }

    if (!this._customerId) {
      throw new Error("CustomerId is required");
    }

    if (this._items.length === 0) {
      throw new Error("Items are required");
    }

    return true;
  }

  get id(): string {
    return this._id;
  }

  get total(): number {
    return this._total;
  }

  get items(): OrderItem[] {
    return this._items;
  }

  get customerId(): string {
    return this._customerId;
  }
}
