import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository/customer-repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";

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
    });
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
      }
    );
  }

  async delete(id: string): Promise<void> {
    await CustomerModel.destroy({ where: { id } });
  }

  async find(id: string): Promise<Customer> {
    const model = await CustomerModel.findOne({ where: { id } });
    const customer = new Customer(model.id, model.name);
    customer.address = new Address(model.street, model.number, model.city,  model.zipcode);
    if (model.active) {
      customer.activate();
    }

    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const models = await CustomerModel.findAll();
    return models.map((model) => {
      const customer = new Customer(model.id, model.name);
      customer.address = new Address(model.street, model.number, model.city, model.zipcode);
      if (model.active) {
        customer.activate();
      }

      return customer;
    });
  }
}
