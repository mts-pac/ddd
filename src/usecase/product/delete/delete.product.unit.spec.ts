import CreateProductUseCase from '../create/create.product.usecase'
import FindProductUseCase from '../find/find.product.usecase'
import DeleteProductUseCase from './delete.product.usecase'

const input = {
  name: 'Product 1',
  price: 100,
}

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(null)),
    findAll: jest.fn(),
    create: jest.fn().mockReturnValue(Promise.resolve(input)),
    delete: jest.fn(),
    update: jest.fn(),
  }
}

describe('Delete Product Use Case Unit Tests', () => {
  it('should delete a product', async () => {
    const createUseCase = new CreateProductUseCase(MockRepository())
    const deleteUseCase = new DeleteProductUseCase(MockRepository())
    const findUseCase = new FindProductUseCase(MockRepository())
    const { id } = await createUseCase.execute(input)

    await deleteUseCase.execute({ id })
    const findedProduct = await findUseCase.execute({ id }).catch((): null => null)
    expect(findedProduct).toBeNull()
  })
})
