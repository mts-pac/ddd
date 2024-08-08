import Address from "./entity/address";
import Customer from "./entity/customer";

let customer = new Customer("1", "John Doe");
const address = new Address("Street", 2, "Springfield", "USA");

customer.address = address;
customer.activate();
