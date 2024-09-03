import { Sequelize } from 'sequelize-typescript'
import CustomerModel from '../db/sequelize/model/customer.model'
import OrderModel from '../db/sequelize/model/order.model'
import OrderItemModel from '../db/sequelize/model/order-item.model'
import ProductModel from '../db/sequelize/model/product.model'
import CustomerRepository from './customer.repository'
import Customer from '../../domain/entity/customer'
import Address from '../../domain/entity/address'
import ProductRepository from './product.repository'
import Product from '../../domain/entity/product'
import OrderItem from '../../domain/entity/order-item'
import Order from '../../domain/entity/order'
import OrderRepository from './order.repository'

describe('Order repository unit test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  const createCustomer = async () => {
    const repo = new CustomerRepository()
    const customer = new Customer('1', 'Customer 1')
    const address = new Address('Street 1', 1, 'City 1', 'Zipcode 1')
    customer.address = address

    await repo.create(customer)
    return customer
  }

  const createProduct = async (p?: Product) => {
    const repo = new ProductRepository()
    const product = p ? p : new Product('1', 'Product 1', 10)
    await repo.create(product)
    return product
  }

  it('should create a new order', async () => {
    const customer = await createCustomer()
    const product = await createProduct()
    const repo = new OrderRepository()

    const oi = new OrderItem('1', product.name, product.price, product.id, 2)
    const order = new Order('1', customer.id, [oi])
    await repo.create(order)

    const model: OrderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    })
    expect(model.toJSON()).toStrictEqual({
      id: '1',
      customer_id: customer.id,
      total: 20,
      items: [
        {
          id: oi.id,
          name: oi.name,
          price: oi.price,
          quantity: oi.quantity,
          order_id: order.id,
          product_id: product.id,
        },
      ],
    })
  })

  it('should find a order', async () => {
    const customer = await createCustomer()
    const p1 = await createProduct()
    const p2 = await createProduct(new Product('2', 'Product 2', 20))
    const oi1 = new OrderItem('1', p1.name, p1.price, p1.id, 2)
    const oi2 = new OrderItem('2', p2.name, p2.price, p2.id, 1)

    const repo = new OrderRepository()
    await repo.create(new Order('1', customer.id, [oi1, oi2]))

    const model = await OrderModel.findOne({ where: { id: '1' }, include: ['items'] })
    const found = await repo.find('1')
    expect(model.toJSON()).toStrictEqual({
      id: found.id,
      customer_id: found.customerId,
      total: found.total,
      items: found.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        order_id: item.orderId,
        product_id: item.productId,
        quantity: item.quantity,
      })),
    })
  })

  it('should update a order', async () => {
    const customer = await createCustomer()
    const product = await createProduct()
    const repo = new OrderRepository()

    const oi1 = new OrderItem('1', product.name, product.price, product.id, 2)
    const order = new Order('1', customer.id, [oi1])
    await repo.create(order)

    const oi2 = new OrderItem('2', product.name, product.price, product.id, 1)
    order.addItem(oi2)

    await repo.update(order)
    const model = await OrderModel.findOne({ where: { id: '1' }, include: ['items'] })
    order.items.forEach((item) => {
      item.orderId = order.id
    })

    expect(model.toJSON()).toStrictEqual({
      id: '1',
      customer_id: customer.id,
      total: 30,
      items: order.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        order_id: item.orderId,
        product_id: item.productId,
        quantity: item.quantity,
      })),
    })
  })

  it('should delete a order', async () => {
    const customer = await createCustomer()
    const product = await createProduct()
    const repo = new OrderRepository()

    const oi = new OrderItem('1', product.name, product.price, product.id, 2)
    await repo.create(new Order('1', customer.id, [oi]))

    await repo.delete('1')
    const model = await OrderModel.findOne({ where: { id: '1' } })
    expect(model).toBeNull()
  })

  it('should find all orders', async () => {
    const customer = await createCustomer()
    const product = await createProduct()
    const repo = new OrderRepository()

    const oi1 = new OrderItem('1', product.name, product.price, product.id, 2)
    const o1 = new Order('1', customer.id, [oi1])
    oi1.orderId = o1.id

    const oi2 = new OrderItem('2', product.name, product.price, product.id, 1)
    const o2 = new Order('2', customer.id, [oi2])
    oi2.orderId = o2.id

    await repo.create(o1)
    await repo.create(o2)

    const founds = await repo.findAll()
    expect(founds.map((o) => o.toJSON())).toEqual([o1, o2].map((o) => o.toJSON()))
  })
})
