import Order from '../entity/order'
import RepositoryInterface from '../../@shared/repository/repository-interface.interface'

type OrderRepositoryInterface = {} & RepositoryInterface<Order>
export default OrderRepositoryInterface
