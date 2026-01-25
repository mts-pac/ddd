import OrderItemFactory from './order-item.factory'

describe('OrderItem factory unit tests', () => {
  it('should create order item successfully', () => {
    const orderItem = OrderItemFactory.create('Book', 10, 'p1', 2)

    expect(orderItem.id).toBeDefined()
    expect(orderItem.name).toBe('Book')
    expect(orderItem.price).toBe(10)
    expect(orderItem.productId).toBe('p1')
    expect(orderItem.quantity).toBe(2)
  })
})
