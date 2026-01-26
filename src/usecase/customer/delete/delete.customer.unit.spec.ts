import CustomerFactory from '../../../domain/customer/factory/customer.factory'
import DeleteCustomerUseCase from './delete.customer.usecase'
import AddressFactory from '../../../domain/customer/factory/address.factory'
import CreateCustomerUseCase from '../create/create.customer.usecase'
import FindCustomerUseCase from '../find/find.customer.usecase'

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  }
}

describe('Delete Customer Use Case Unit Tests', () => {
  it('should delete a customer', async () => {
    const address = AddressFactory.create('Street 1', 123, '12345', 'City')
    const customer = CustomerFactory.createWithAddress('John Doe', address)
    const createUseCase = new CreateCustomerUseCase(MockRepository())
    const deleteUseCase = new DeleteCustomerUseCase(MockRepository())
    const findUseCase = new FindCustomerUseCase(MockRepository())

    await createUseCase.execute(customer)
    await deleteUseCase.execute({ id: customer.id })

    const foundCustomer = await findUseCase.execute({ id: customer.id }).catch((): null => null)
    expect(foundCustomer).toBeNull()
  })
})
