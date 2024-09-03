import Product from "../entity/product";
import RepositoryInterface from "./repository-interface.interface";

type ProductRepositoryInterface = {} & RepositoryInterface<Product>
export default ProductRepositoryInterface
