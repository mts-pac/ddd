import FindCustomerUseCase from './find.customer.usecase'
import CustomerFactory from '../../../domain/customer/factory/customer.factory'
import AddressFactory from '../../../domain/customer/factory/address.factory'
import { v4 as uuid } from 'uuid'

const customer = CustomerFactory.create('John Doe')
const address = AddressFactory.create('Street', 123, 'City', 'Zip')
customer.address = address

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit Test find customer use case', () => {
  it('should find a customer', async () => {
    const customerRepository = MockRepository()
    const usecase = new FindCustomerUseCase(customerRepository)

    const output = {
      id: customer.id,
      name: 'John Doe',
      address: {
        street: 'Street',
        city: 'City',
        number: 123,
        zip: 'Zip',
      },
    }

    const result = await usecase.execute({ id: customer.id })

    expect(result).toEqual(output)
  })

  it('should not find a customer', async () => {
    const customerRepository = MockRepository()
    customerRepository.find.mockImplementation(() => {
      throw new Error('Customer not found')
    })
    const usecase = new FindCustomerUseCase(customerRepository)

    expect(() => {
      return usecase.execute({ id: uuid() })
    }).rejects.toThrow('Customer not found')
  })
})
