import Order from '../../../../domain/checkout/entity/order'
import OrderItem from '../../../../domain/checkout/entity/order-item'
import OrderRepositoryInterface from '../../../../domain/checkout/repository/order-repository.interface'
import OrderItemModel from './order-item.model'
import OrderModel from './order.model'

export default class OrderRepository implements OrderRepositoryInterface {
  private toOrderItem = (oi: OrderItemModel, orderId?: string) => {
    if (orderId) {
      const entity = new OrderItem(oi.id, oi.name, oi.price, oi.product_id, oi.quantity)
      entity.orderId = orderId
      return entity
    }

    return new OrderItem(oi.id, oi.name, oi.price, oi.product_id, oi.quantity)
  }

  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total,
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      },
    )
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        id: entity.id,
        customer_id: entity.customerId,
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
        total: entity.total,
      },
      {
        where: { id: entity.id },
      },
    )

    await OrderItemModel.bulkCreate(
      entity.items.map((item) => ({
        id: item.id,
        order_id: entity.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
      })),
      {
        updateOnDuplicate: ['name', 'price', 'quantity'], // Campos que serão atualizados caso o registro já exista
      },
    )
  }

  async delete(id: string): Promise<void> {
    await OrderModel.destroy({ where: { id } })
  }

  async find(id: string): Promise<Order> {
    const model = await OrderModel.findOne({ where: { id }, include: ['items'] })
    const items = model.items.map((el) => this.toOrderItem(el, model.id))
    return new Order(model.id, model.customer_id, items)
  }

  async findAll(): Promise<Order[]> {
    const models = await OrderModel.findAll({ include: ['items'] })

    return models.map((model) => {
      const items = model.items.map((el) => this.toOrderItem(el, model.id))
      return new Order(model.id, model.customer_id, items)
    })
  }
}
