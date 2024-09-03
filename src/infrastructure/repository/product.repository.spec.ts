import { Sequelize } from 'sequelize-typescript'
import ProductModel from '../db/sequelize/model/product.model'
import Product from '../../domain/entity/product'
import ProductRepository from './product.repository'

describe('Product repository unit test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a product', async () => {
    const repo = new ProductRepository()
    const product = new Product('1', 'Product 1', 1000)
    await repo.create(product)

    const model = await ProductModel.findOne({ where: { id: '1' } })
    expect(model.toJSON()).toStrictEqual({
      id: '1',
      name: 'Product 1',
      price: 1000,
    })
  })

  it('should update a product', async () => {
    const repo = new ProductRepository()
    const product = new Product('1', 'Product 1', 1000)
    await repo.create(product)

    product.name = 'Product 2'
    product.price = 2000
    await repo.update(product)

    const model = await ProductModel.findOne({ where: { id: '1' } })
    expect(model.toJSON()).toStrictEqual({
      id: '1',
      name: 'Product 2',
      price: 2000,
    })
  })

  it('should delete a product', async () => {
    const repo = new ProductRepository()
    const product = new Product('1', 'Product 1', 1000)
    await repo.create(product)

    await repo.delete('1')

    const model = await ProductModel.findOne({ where: { id: '1' } })
    expect(model).toBeNull()
  })

  it('should find a product', async () => {
    const repo = new ProductRepository()
    const product = new Product('1', 'Product 1', 1000)
    await repo.create(product)

    const model = await ProductModel.findOne({ where: { id: '1' } })
    const found = await repo.find('1')
    expect(model.toJSON()).toStrictEqual({
      id: found.id,
      name: found.name,
      price: found.price,
    })
  })

  it('should find all products', async () => {
    const repo = new ProductRepository()
    const p1 = new Product('1', 'Product 1', 1000)
    const p2 = new Product('2', 'Product 2', 2000)

    await repo.create(p1)
    await repo.create(p2)
    const founds = await repo.findAll()

    expect(founds).toEqual([p1, p2])
  })
})
