import { Sequelize } from 'sequelize-typescript'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository'
import ListProductUseCase from './list.product.usecase'
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model'
import CreateProductUseCase from '../create/create.product.usecase'

const p1 = {
  name: 'Product 1',
  price: 100,
}
const p2 = {
  name: 'Product 2',
  price: 200,
}

describe('Integration test for product list use case', () => {
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

  it('should list all products', async () => {
    const productRepository = new ProductRepository()
    const createUseCase = new CreateProductUseCase(productRepository)
    const { id: id1 } = await createUseCase.execute(p1)
    const { id: id2 } = await createUseCase.execute(p2)
    const listProductUseCase = new ListProductUseCase(productRepository)

    const output = await listProductUseCase.execute()
    expect(output).toEqual({
      products: [
        {
          id: id1,
          name: p1.name,
          price: p1.price,
        },
        {
          id: id2,
          name: p2.name,
          price: p2.price,
        },
      ],
    })
  })
})
