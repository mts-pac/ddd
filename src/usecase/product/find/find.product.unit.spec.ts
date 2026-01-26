import ProductFactory from '../../../domain/product/factory/product.factory'
import FindProductUseCase from './find.product.usecase'

const product = ProductFactory.create('Product 1', 200)
const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    delete: jest.fn(),
    update: jest.fn(),
  }
}

describe('Find Product Use Case Unit Tests', () => {
  it('should find a product', async () => {
    const productRepository = MockRepository()
    const findProductUseCase = new FindProductUseCase(productRepository)

    const input = {
      id: product.id,
    }

    const output = await findProductUseCase.execute(input)

    expect(output).toEqual({
      id: product.id,
      name: product.name,
      price: product.price,
    })
  })
})
