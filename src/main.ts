import Address from './domain/customer/entity/address'
import Customer from './domain/customer/entity/customer'

const customer = new Customer('1', 'John Doe')
const address = new Address('Street', 2, 'Springfield', 'USA')

customer.address = address
customer.activate()
