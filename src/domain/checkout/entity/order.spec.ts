import Order from './order'
import OrderItem from './order-item'
import Product from '../../product/entity/product'

describe('Order unit  tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => new Order('', '123', [])).toThrow('Id is required')
  })

  it('should throw error when customerId is empty', () => {
    expect(() => new Order('1', '', [])).toThrow('CustomerId is required')
  })

  it('should throw error when items quantity is 0', () => {
    expect(() => new Order('1', '123', [])).toThrow('Items are required')
  })

  it('should calculate total', () => {
    const book = new Product('1', 'Book', 25)
    const pen = new Product('2', 'Pen', 5)
    const bag = new Product('3', 'Bag', 100)

    const items = {
      book: new OrderItem('1', 'Book', 25, book.id, 2),
      pen: new OrderItem('2', 'Pen', 5, pen.id, 3),
      bag: new OrderItem('3', 'Bag', 100, bag.id, 5),
    }

    const orders = {
      1: [items.book, items.pen, items.bag],
      2: [items.book, items.bag],
      3: [items.pen, items.bag],
    }

    expect(new Order('1', '1', orders[1]).total).toBe(2 * 25 + 3 * 5 + 5 * 100)
    expect(new Order('2', '1', orders[2]).total).toBe(2 * 25 + 5 * 100)
    expect(new Order('3', '1', orders[3]).total).toBe(3 * 5 + 5 * 100)
  })
})
