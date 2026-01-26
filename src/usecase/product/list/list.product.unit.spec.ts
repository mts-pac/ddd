import ProductFactory from '../../../domain/product/factory/product.factory'
import ListProductUseCase from './list.product.usecase'

const p1 = ProductFactory.create('Product 1', 100)
const p2 = ProductFactory.create('Product 2', 200)

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([p1, p2])),
    find: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit test for product list use case', () => {
  it('should list all products', async () => {
    const productRepository = MockRepository()
    const listProductUseCase = new ListProductUseCase(productRepository)

    const output = await listProductUseCase.execute()
    expect(output).toEqual({
      products: [
        {
          id: p1.id,
          name: p1.name,
          price: p1.price,
        },
        {
          id: p2.id,
          name: p2.name,
          price: p2.price,
        },
      ],
    })
  })
})
