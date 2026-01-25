import AddressFactory from '../factory/address.factory'
import CustomerFactory from './customer.factory'

describe('Customer factory unit test', () => {
  it('should create a customer', () => {
    const customer = CustomerFactory.create('John')

    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('John')
    expect(customer.address).toBeUndefined()
  })

  it('should create a customer with an address', () => {
    const address = AddressFactory.create('Street', 1, '13330-250', 'São Paulo')

    const customer = CustomerFactory.createWithAddress('John', address)

    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('John')
    expect(customer.address).toBe(address)
  })
})
