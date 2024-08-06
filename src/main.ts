import Address from "./entity/address";
import Customer from "./entity/customer"
import Order from "./entity/order";
import OrderItem from "./entity/order_item";

let customer = new Customer("1", "John Doe");
const address = new Address("Street", 2, "Springfield", "USA");

customer.address = address;
customer.activate();

// const book = new OrderItem("1", "Book", 20);
// const pen = new OrderItem("2", "Pen", 10);

// const order = new Order("1", "1", [book, pen]);
