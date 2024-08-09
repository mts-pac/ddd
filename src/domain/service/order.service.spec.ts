import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order-item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {
  it("should place an order", () => {
    const customer = new Customer("1", "John Doe");
    const book = new OrderItem("1", "Book", 10, "1", 1);

    const order = OrderService.place(customer, [book]);
    expect(customer.rewardPoints).toBe(5);
    expect(order.total).toBe(10);
  });

  it("should get total of all orders", () => {
    const book = new OrderItem("1", "Book", 10, "1", 1);
    const pen = new OrderItem("1", "Pen", 5, "2", 1);

    const order1 = new Order("1", "1", [book, pen]);
    const order2 = new Order("2", "1", [book, pen]);

    const total = OrderService.total([order1, order2]);
    expect(total).toBe(30);
  });
});
