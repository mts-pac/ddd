import Customer from '../entity/customer'
import RepositoryInterface from './repository-interface.interface'

type CustomerRepositoryInterface = {} & RepositoryInterface<Customer>
export default CustomerRepositoryInterface
