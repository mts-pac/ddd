import OrderItem from '../entity/order-item'
import { v4 as uuid } from 'uuid'

export default class {
  public static create(
    name: string,
    price: number,
    productId: string,
    quantity: number = 1,
  ): OrderItem {
    return new OrderItem(uuid(), name, price, productId, quantity)
  }
}
