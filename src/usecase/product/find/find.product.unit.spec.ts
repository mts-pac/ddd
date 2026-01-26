import CreateProductUseCase from '../create/create.product.usecase'
import FindProductUseCase from './find.product.usecase'

const product = {
  name: 'Product 1',
  price: 100,
}

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
    const createProductUseCase = new CreateProductUseCase(productRepository)
    const findProductUseCase = new FindProductUseCase(productRepository)

    const { id } = await createProductUseCase.execute(product)
    const output = await findProductUseCase.execute({ id })

    expect(output).toEqual({
      name: product.name,
      price: product.price,
    })
  })
})
