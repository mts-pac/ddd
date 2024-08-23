import Order from "../../domain/entity/order";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create({
      id: entity.id,
      customer_id: entity.customerId,
      total: entity.total,
      items: entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
      })),
    }, {
      include: [{ model: OrderItemModel }]
    })
    // await CustomerModel.create({
    //   id: entity.id,
    //   name: entity.name,
    //   street: entity.address.street,
    //   number: entity.address.number,
    //   zipcode: entity.address.zip,
    //   city: entity.address.city,
    //   active: entity.isActive,
    //   rewardPoints: entity.rewardPoints,
    // });
  }

  async update(entity: Order): Promise<void> {
    // await CustomerModel.update(
    //   {
    //     name: entity.name,
    //     street: entity.address.street,
    //     number: entity.address.number,
    //     zipcode: entity.address.zip,
    //     city: entity.address.city,
    //     active: entity.isActive,
    //     rewardPoints: entity.rewardPoints,
    //   },
    //   {
    //     where: { id: entity.id },
    //   }
    // );
  }

  async delete(id: string): Promise<void> {
    // await CustomerModel.destroy({ where: { id } });
  }

  async find(id: string): Promise<Order> {
    // const model = await CustomerModel.findOne({ where: { id } });
    // const customer = new Customer(model.id, model.name);
    // customer.address = new Address(model.street, model.number, model.city,  model.zipcode);
    // if (model.active) {
    //   customer.activate();
    // }

    // return customer;
    return null
  }

  async findAll(): Promise<Order[]> {
    // const models = await CustomerModel.findAll();
    // return models.map((model) => {
    //   const customer = new Customer(model.id, model.name);
    //   customer.address = new Address(model.street, model.number, model.city, model.zipcode);
    //   if (model.active) {
    //     customer.activate();
    //   }

    //   return customer;
    // });

    return []
  }
}
