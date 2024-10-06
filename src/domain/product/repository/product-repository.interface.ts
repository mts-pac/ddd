import Product from '../entity/product'
import RepositoryInterface from '../../@shared/repository/repository-interface.interface'

type ProductRepositoryInterface = {} & RepositoryInterface<Product>
export default ProductRepositoryInterface
