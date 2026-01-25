import Address from '../entity/address'
import Customer from '../entity/customer'
import { v4 as uuid } from 'uuid'

export default class CustomerFactory {
  public static create(name: string): Customer {
    return new Customer(uuid(), name)
  }

  public static createWithAddress(name: string, address: Address): Customer {
    const customer = new Customer(uuid(), name)
    customer.address = address
    return customer
  }
}
