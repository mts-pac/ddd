import { Sequelize } from "sequelize-typescript"
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model"
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository"
import CustomerFactory from "../../../domain/customer/factory/customer.factory"
import DeleteCustomerUseCase from "./delete.customer.usecase"
import AddressFactory from "../../../domain/customer/factory/address.factory"
import CreateCustomerUseCase from "../create/create.customer.usecase"
import FindCustomerUseCase from "../find/find.customer.usecase"

describe('Delete Customer Use Case Integration Tests', () => {
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

  it('should delete a customer', async () => {
    const customerRepository = new CustomerRepository()
    const address = AddressFactory.create('Street 1', 123, '12345', 'City');
    const customer = CustomerFactory.createWithAddress('John Doe', address);
    const createUseCase = new CreateCustomerUseCase(customerRepository)
    const deleteUseCase = new DeleteCustomerUseCase(customerRepository)
    const findUseCase = new FindCustomerUseCase(customerRepository)


    await createUseCase.execute(customer)
    await deleteUseCase.execute({ id: customer.id })

    const foundCustomer = await findUseCase.execute({ id: customer.id }).catch((): null => null)
    expect(foundCustomer).toBeNull()
  })
})  