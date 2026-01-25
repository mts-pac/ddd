import Address from './domain/customer/entity/address'
import CustomerFactory from './domain/customer/factory/customer.factory'

const customer = CustomerFactory.create('John Doe')
const address = new Address('Street', 2, 'Springfield', 'USA')

customer.address = address
customer.activate()
