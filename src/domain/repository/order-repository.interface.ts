import Order from "../entity/order";
import RepositoryInterface from "./repository-interface.interface";

type OrderRepositoryInterface = {} & RepositoryInterface<Order>
export default OrderRepositoryInterface
