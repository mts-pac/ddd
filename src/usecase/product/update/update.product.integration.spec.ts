import { Sequelize } from 'sequelize-typescript'
import ProductFactory from '../../../domain/product/factory/product.factory'
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository'
import CreateProductUseCase from '../create/create.product.usecase'
import UpdateProductUseCase from './update.product.usecase'

const product = ProductFactory.create('Product 1', 100)
const input = ProductFactory.create('Product 1', 200)

describe('Integration test for product update use case', () => {
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

  it('should update a product', async () => {
    const productRepository = new ProductRepository()
    const createProductUseCase = new CreateProductUseCase(productRepository)
    const productUpdateUseCase = new UpdateProductUseCase(productRepository)

    const { id } =  await createProductUseCase.execute(product)
    const output = await productUpdateUseCase.execute({
      id,
      name: input.name,
      price: input.price,
    })

    expect({
      id: output.id,
      name: output.name,
      price: output.price,
    }).toEqual({
      id,
      name: input.name,
      price: input.price,
    })
  })
})
