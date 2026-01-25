import Order from './order'
import { v4 as uuid } from 'uuid'
import Product from '../../product/entity/product'
import OrderFactory from '../factory/order.factory'
import OrderItemFactory from '../factory/order-item.factory'

describe('Order unit  tests', () => {
  it('Should throw error when id is empty', () => {
    expect(() => new Order('', uuid(), [OrderItemFactory.create('Book', 50, uuid(), 2)])).toThrow(
      'Id is required',
    )
  })

  it('Should throw error when customerId is empty', () => {
    expect(() =>
      OrderFactory.create(null, [OrderItemFactory.create('Book', 50, uuid(), 2)]),
    ).toThrow('CustomerId is required')
  })

  it('Should throw error when items quantity is 0', () => {
    expect(() => OrderFactory.create(uuid(), [])).toThrow('Items are required')
  })

  it('Should calculate total', () => {
    const book = new Product(uuid(), 'Book', 25)
    const pen = new Product(uuid(), 'Pen', 5)
    const bag = new Product(uuid(), 'Bag', 100)

    const items = {
      book: OrderItemFactory.create('Book', 25, book.id, 2),
      pen: OrderItemFactory.create('Pen', 5, pen.id, 3),
      bag: OrderItemFactory.create('Bag', 100, bag.id, 5),
    }

    const orders = {
      1: [items.book, items.pen, items.bag],
      2: [items.book, items.bag],
      3: [items.pen, items.bag],
    }

    expect(OrderFactory.create(uuid(), orders[1]).total).toBe(2 * 25 + 3 * 5 + 5 * 100)
    expect(OrderFactory.create(uuid(), orders[2]).total).toBe(2 * 25 + 5 * 100)
    expect(OrderFactory.create(uuid(), orders[3]).total).toBe(3 * 5 + 5 * 100)
  })
})
