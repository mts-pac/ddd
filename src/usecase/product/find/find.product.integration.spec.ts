import { Sequelize } from 'sequelize-typescript'
import ProductFactory from '../../../domain/product/factory/product.factory'
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model'
import FindProductUseCase from './find.product.usecase'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository'
import CreateProductUseCase from '../create/create.product.usecase'

const product = ProductFactory.create('Product 1', 100)

describe('Find Product Use Case Integration Tests', () => {
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

  it('should find a product', async () => {
    const productRepository = new ProductRepository()
    const createProductUseCase = new CreateProductUseCase(productRepository)
    const findProductUseCase = new FindProductUseCase(productRepository)


    const { id } = await createProductUseCase.execute(product)
    
    const output = await findProductUseCase.execute({ id })

    expect(output).toEqual({
      id,
      name: product.name,
      price: product.price,
    })
  })
})
