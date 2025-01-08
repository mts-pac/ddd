import Address from '../../../../domain/customer/entity/address'
import Customer from '../../../../domain/customer/entity/customer'
import CustomerRepositoryInterface from '../../../../domain/customer/repository/customer-repository.interface'
import CustomerModel from './customer.model'

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      number: entity.address.number,
      zipcode: entity.address.zip,
      city: entity.address.city,
      active: entity.isActive,
      rewardPoints: entity.rewardPoints,
    })
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.address.street,
        number: entity.address.number,
        zipcode: entity.address.zip,
        city: entity.address.city,
        active: entity.isActive,
        rewardPoints: entity.rewardPoints,
      },
      {
        where: { id: entity.id },
      },
    )
  }

  async delete(id: string): Promise<void> {
    await CustomerModel.destroy({ where: { id } })
  }

  async find(id: string): Promise<Customer> {
    const model = await CustomerModel.findOne({ where: { id } })
    const address = new Address(model.street, model.number, model.city, model.zipcode)
    const customer = Customer.createWithoutValidate(
      model.id,
      model.name,
      address,
      model.active,
      model.rewardPoints,
    )
    return customer
  }

  async findAll(): Promise<Customer[]> {
    const models = await CustomerModel.findAll()
    return models.map((model) => {
      const address = new Address(model.street, model.number, model.city, model.zipcode)
      const customer = Customer.createWithoutValidate(
        model.id,
        model.name,
        address,
        model.active,
        model.rewardPoints,
      )

      return customer
    })
  }
}
