import { Sequelize } from 'sequelize-typescript'
import AddressFactory from '../../../domain/customer/factory/address.factory'
import CustomerFactory from '../../../domain/customer/factory/customer.factory'
import CustomerModel from '../../../infrastructure/customer/repository/sequelize/customer.model'

import ListCustomerUseCase from './list.customer.usecase'
import CustomerRepository from '../../../infrastructure/customer/repository/sequelize/customer.repository'
import CreateCustomerUseCase from '../create/create.customer.usecase'
const customer1 = CustomerFactory.createWithAddress(
  'John Doe',
  AddressFactory.create('Street 1', 1, '12345', 'City'),
)

const customer2 = CustomerFactory.createWithAddress(
  'Jane Doe',
  AddressFactory.create('Street 2', 2, '123456', 'City 2'),
)

describe('Integration test for listing customer use case', () => {
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

  it('should list a customer', async () => {
    const repository = new CustomerRepository()
    const createUseCase = new CreateCustomerUseCase(repository)
    await createUseCase.execute(customer1)
    await createUseCase.execute(customer2)

    const listUseCase = new ListCustomerUseCase(repository)

    const output = await listUseCase.execute({})

    expect(output.customers.length).toBe(2)
    expect(output.customers[0].name).toBe(customer1.name)
    expect(output.customers[0].address.street).toBe(customer1.address.street)
    expect(output.customers[1].name).toBe(customer2.name)
    expect(output.customers[1].address.street).toBe(customer2.address.street)
  })
})
