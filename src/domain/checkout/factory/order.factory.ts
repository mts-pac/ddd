import Order from '../entity/order'
import OrderItem from '../entity/order-item'
import { v4 as uuid } from 'uuid'

export default class {
  public static create(customerId: string, items: OrderItem[]): Order {
    return new Order(uuid(), customerId, items)
  }
}
