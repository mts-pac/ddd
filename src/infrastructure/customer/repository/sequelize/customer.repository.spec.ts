import { Sequelize } from 'sequelize-typescript'
import CustomerRepository from './customer.repository'
import CustomerModel from './customer.model'
import Customer from '../../../../domain/customer/entity/customer'
import Address from '../../../../domain/customer/entity/address'

describe('Customer repository unit test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([CustomerModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a customer', async () => {
    const repo = new CustomerRepository()
    const customer = Customer.create('1', 'Customer 1')
    customer.address = new Address('Street 1', 1, 'City 1', '12345')
    await repo.create(customer)

    const model = await CustomerModel.findOne({ where: { id: '1' } })
    expect(model.toJSON()).toStrictEqual({
      id: '1',
      name: 'Customer 1',
      street: 'Street 1',
      number: 1,
      zipcode: '12345',
      city: 'City 1',
      active: false,
      rewardPoints: 0,
    })
  })

  it('should update a customer', async () => {
    const repo = new CustomerRepository()
    const customer = Customer.create('1', 'Customer 1')
    customer.address = new Address('Street 1', 1, 'City 1', '12345')
    await repo.create(customer)

    customer.name = 'Customer 2'
    customer.address = new Address('Street 2', 2, 'City 2', '54321')
    customer.activate()
    await repo.update(customer)

    const model = await CustomerModel.findOne({ where: { id: '1' } })
    expect(model.toJSON()).toStrictEqual({
      id: '1',
      name: 'Customer 2',
      street: 'Street 2',
      number: 2,
      zipcode: '54321',
      city: 'City 2',
      active: true,
      rewardPoints: 0,
    })
  })

  it('should delete a customer', async () => {
    const repo = new CustomerRepository()
    const customer = Customer.create('1', 'Customer 1')
    customer.address = new Address('Street 1', 1, 'City 1', '12345')
    await repo.create(customer)

    await repo.delete('1')

    const model = await CustomerModel.findOne({ where: { id: '1' } })
    expect(model).toBeNull()
  })

  it('should find a customer', async () => {
    const repo = new CustomerRepository()
    const customer = Customer.create('1', 'Customer 1')
    customer.address = new Address('Street 1', 1, 'City 1', '12345')
    await repo.create(customer)

    const model = await CustomerModel.findOne({ where: { id: '1' } })
    const found = await repo.find('1')

    expect(model.toJSON()).toStrictEqual({
      id: found.id,
      name: found.name,
      street: found.address.street,
      number: found.address.number,
      zipcode: found.address.zip,
      city: found.address.city,
      active: found.isActive,
      rewardPoints: found.rewardPoints,
    })
  })

  it('should find all customers', async () => {
    const repo = new CustomerRepository()
    const c1 = Customer.create('1', 'Customer 1')
    c1.address = new Address('Street 1', 1, 'City 1', '12345')
    const c2 =  Customer.create('2', 'Customer 2')
    c2.address = new Address('Street 2', 2, 'City 2', '54321')

    await repo.create(c1)
    await repo.create(c2)

    const modelC1 = await CustomerModel.findOne({ where: { id: '1' } })
    const modelC2 = await CustomerModel.findOne({ where: { id: '2' } })

    const founds = await repo.findAll()
    expect(founds.length).toBe(2)
    
    expect(modelC1.toJSON()).toStrictEqual({
      id: founds[0].id,
      name: founds[0].name,
      street: founds[0].address.street,
      number: founds[0].address.number,
      zipcode: founds[0].address.zip,
      city: founds[0].address.city,
      active: founds[0].isActive,
      rewardPoints: founds[0].rewardPoints,
    })
    expect(modelC2.toJSON()).toStrictEqual({
      id: founds[1].id,
      name: founds[1].name,
      street: founds[1].address.street,
      number: founds[1].address.number,
      zipcode: founds[1].address.zip,
      city: founds[1].address.city,
      active: founds[1].isActive,
      rewardPoints: founds[1].rewardPoints,
    })
  })
})
