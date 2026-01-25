import OrderItemFactory from '../factory/order-item.factory'
import OrderItem from './order-item'
import { v4 as uuid } from 'uuid'

describe('Orde Item unit  tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => new OrderItem(null, 'OrderItem 1', 100, uuid())).toThrow('Id is required')
  })

  it('should throw error when name is empty', () => {
    expect(() => OrderItemFactory.create(null, 100, uuid())).toThrow('Name is required')
  })

  it('should throw error when price is empty', () => {
    expect(() => OrderItemFactory.create('OrderItem 1', null, uuid())).toThrow('Price is required')
  })

  it('should throw error when price is less than zero', () => {
    expect(() => OrderItemFactory.create('OrderItem 1', -1, uuid())).toThrow(
      'Price must be greater than zero',
    )
  })

  it('should throw error when quantity is less than zero', () => {
    expect(() => OrderItemFactory.create('OrderItem 1', 100, uuid(), -1)).toThrow(
      'Quantity must be greater than zero',
    )
  })
})
