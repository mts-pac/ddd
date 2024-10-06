import RepositoryInterface from '../../@shared/repository/repository-interface.interface'
import Customer from '../entity/customer'

type CustomerRepositoryInterface = {} & RepositoryInterface<Customer>
export default CustomerRepositoryInterface
