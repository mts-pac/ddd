import { Sequelize } from "sequelize-typescript";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import CustomerModel from "../db/sequelize/model/customer.model";

describe("Customer repository unit test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const repo = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    customer.address = new Address("Street 1", 1, "City 1", "12345");
    await repo.create(customer);

    const model = await CustomerModel.findOne({ where: { id: "1" } });
    expect(model.toJSON()).toStrictEqual({
      id: "1",
      name: "Customer 1",
      street: "Street 1",
      number: 1,
      zipcode: "12345",
      city: "City 1",
      active: false,
      rewardPoints: 0,
    });
  });

  it("should update a customer", async () => {
    const repo = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    customer.address = new Address("Street 1", 1, "City 1", "12345");
    await repo.create(customer);

    customer.name = "Customer 2";
    customer.address = new Address("Street 2", 2, "City 2", "54321");
    customer.activate();
    await repo.update(customer);
    
    const model = await CustomerModel.findOne({ where: { id: "1" } });
    expect(model.toJSON()).toStrictEqual({
      id: "1",
      name: "Customer 2",
      street: "Street 2",
      number: 2,
      zipcode: "54321",
      city: "City 2",
      active: true,
      rewardPoints: 0,
    });
  });

  it("should delete a customer", async () => {
    const repo = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    customer.address = new Address("Street 1", 1, "City 1", "12345");
    await repo.create(customer);

    await repo.delete("1");
    
    const model = await CustomerModel.findOne({ where: { id: "1" } });
    expect(model).toBeNull();
  });

  it("should find a customer", async () => {
    const repo = new CustomerRepository();
    const customer = new Customer("1", "Customer 1");
    customer.address = new Address("Street 1", 1, "City 1", "12345");
    await repo.create(customer);

    const model = await CustomerModel.findOne({ where: { id: "1" } });
    const found = await repo.find("1");

    expect(model.toJSON()).toStrictEqual({
      id: found.id,
      name: found.name,
      street: found.address.street,
      number: found.address.number,
      zipcode: found.address.zip,
      city: found.address.city,
      active: found.isActive,
      rewardPoints: found.rewardPoints,
    });
  });

  it("should find all customers", async () => {
    const repo = new CustomerRepository();
    const c1 = new Customer("1", "Customer 1");
    c1.address = new Address("Street 1", 1, "City 1", "12345");
    const c2 = new Customer("2", "Customer 2");
    c2.address = new Address("Street 2", 2, "City 2", "54321");

    await repo.create(c1);
    await repo.create(c2);
    
    const founds = await repo.findAll();
    expect(founds).toEqual([c1, c2]);
  });
});
