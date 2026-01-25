import OrderItemFactory from './order-item.factory'
import OrderFactory from './order.factory'
import { v4 as uuid } from 'uuid'

describe('Order factory unit tests', () => {
  it('should create order successfully', () => {
    const items = [
      OrderItemFactory.create('Book', 10, 'p1', 2),
      OrderItemFactory.create('Pen', 5, 'p2', 3),
    ]
    const order = OrderFactory.create(uuid(), items)

    expect(order.id).toBeDefined()
    expect(order.customerId).toBeDefined()
    expect(order.items).toBe(items)
  })
})
