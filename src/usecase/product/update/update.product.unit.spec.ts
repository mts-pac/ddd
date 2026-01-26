import ProductFactory from '../../../domain/product/factory/product.factory'
import CreateProductUseCase from '../create/create.product.usecase'
import UpdateProductUseCase from './update.product.usecase'

const product = ProductFactory.create('Product 1', 100)
const input = ProductFactory.create('Product 1', 200)

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(input)),
    delete: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit test for product update use case', () => {
  it('should update a product', async () => {
    const productRepository = MockRepository()
    const createProductUseCase = new CreateProductUseCase(productRepository)
    const updateProductUseCase = new UpdateProductUseCase(productRepository)

    await createProductUseCase.execute(product)
    const output = await updateProductUseCase.execute(input)

    expect({
      id: output.id,
      name: output.name,
      price: output.price,
    }).toEqual({
      id: input.id,
      name: input.name,
      price: input.price,
    })
  })
})
