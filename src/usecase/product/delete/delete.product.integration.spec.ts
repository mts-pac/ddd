import { Sequelize } from 'sequelize-typescript'
import CreateProductUseCase from '../create/create.product.usecase'
import FindProductUseCase from '../find/find.product.usecase'
import DeleteProductUseCase from './delete.product.usecase'
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model'
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository'

const input = {
  name: 'Product 1',
  price: 100,
}

describe('Delete Product Use Case Unit Tests', () => {
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

  it('should delete a product', async () => {
    const productRepository = new ProductRepository()
    const createUseCase = new CreateProductUseCase(productRepository)
    const deleteUseCase = new DeleteProductUseCase(productRepository)
    const findUseCase = new FindProductUseCase(productRepository)
    const { id } = await createUseCase.execute(input)

    await deleteUseCase.execute({ id })
    const findedProduct = await findUseCase.execute({ id }).catch((): null => null)
    expect(findedProduct).toBeNull()
  })
})
