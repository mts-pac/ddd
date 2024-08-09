import Product from "../entity/product";
import RepositoryInterface from "./repository-interface.interface";

export default interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {}
