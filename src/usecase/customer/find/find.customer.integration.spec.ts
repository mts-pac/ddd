import { Sequelize } from 'sequelize-typescript'
import CustomerModel from '../../../infrastructure/customer/repository/sequelize/customer.model'
import CustomerRepository from '../../../infrastructure/customer/repository/sequelize/customer.repository'
import FindCustomerUseCase from './find.customer.usecase'
import AddressFactory from '../../../domain/customer/factory/address.factory'
import CustomerFactory from '../../../domain/customer/factory/customer.factory'

describe('Test find customer use case', () => {
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

  it('should find a customer', async () => {
    const customerRepository = new CustomerRepository()
    const usecase = new FindCustomerUseCase(customerRepository)

    const customer = CustomerFactory.create('John Doe')
    const address = AddressFactory.create('Street', 123, 'City', 'Zip')
    customer.address = address

    await customerRepository.create(customer)

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
})
