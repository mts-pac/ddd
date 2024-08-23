import Order from "../entity/order";
import RepositoryInterface from "./repository-interface.interface";

export default interface OrderRepositoryInterface
  extends RepositoryInterface<Order> {}
