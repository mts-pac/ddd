import CustomerFactory from '../factory/customer.factory'
import AddressFactory from '../factory/address.factory'
import Customer from './customer'

describe('Customer unit  tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => new Customer(null, 'John Doe')).toThrow('Id is required')
  })

  it('should throw error when name is empty', () => {
    expect(() => CustomerFactory.create(null)).toThrow('Name is required')
  })

  it('should throw error when address is undefined', () => {
    expect(() => CustomerFactory.create('John Doe').activate()).toThrow(
      'Address is mandatory to activate a customer',
    )
  })

  it('should change name', () => {
    // Arrange
    const customer = CustomerFactory.create('John Doe')

    // Act
    customer.name = 'Jane Doe'

    // Assert
    expect(customer.name).toBe('Jane Doe')
  })

  it('should activate customer', () => {
    // Arrange
    const customer = CustomerFactory.create('John Doe')
    const address = AddressFactory.create('Main Street', 123, 'Springfield', '12345-123')
    customer.address = address

    // Act
    customer.activate()

    // Assert
    expect(customer.isActive).toBe(true)
  })

  it('should deactivate customer', () => {
    // Arrange
    const customer = CustomerFactory.create('John Doe')

    // Act
    customer.deactivate()

    // Assert
    expect(customer.isActive).toBe(false)
  })

  it('should add reward points', () => {
    const customer = CustomerFactory.create('John Doe')
    expect(customer.rewardPoints).toBe(0)

    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(10)

    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(20)
  })
})
