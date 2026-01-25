import { Sequelize } from 'sequelize-typescript'
import UpdateCustomerUseCase from './update.customer.usecase'
import AddressFactory from '../../../domain/customer/factory/address.factory'
import CustomerFactory from '../../../domain/customer/factory/customer.factory'
import CustomerModel from '../../../infrastructure/customer/repository/sequelize/customer.model'
import CustomerRepository from '../../../infrastructure/customer/repository/sequelize/customer.repository'

const customer = CustomerFactory.createWithAddress(
  'John',
  AddressFactory.create('Street', 123, 'Zip', 'City'),
)

const input = {
  id: customer.id,
  name: 'John Updated',
  address: {
    street: 'Street Updated',
    number: 1234,
    zip: 'Zip Updated',
    city: 'City Updated',
  },
}

describe('Integration test for customer update use case', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    await sequelize.addModels([CustomerModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should update a customer', async () => {
    const customerRepository = new CustomerRepository()
    await customerRepository.create(customer)
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository)

    const output = await customerUpdateUseCase.execute(input)

    expect(output).toEqual(input)
  })
})
