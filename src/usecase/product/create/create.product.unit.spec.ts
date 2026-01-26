import CreateProductUseCase from './create.product.usecase'

const input = {
  name: 'Product 1',
  price: 100,
}

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }
}

describe('Create Product Use Case Unit Tests', () => {
  it('should create a product', async () => {
    const productRepository = MockRepository()
    const createProductUseCase = new CreateProductUseCase(productRepository)

    const output = await createProductUseCase.execute(input)

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price,
    })
  })
})
