import Address from './address'
import Customer from './customer'

describe('Customer unit  tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => Customer.create('', 'John Doe')).toThrow('Id is required')
  })

  it('should throw error when name is empty', () => {
    expect(() => Customer.create('123', '')).toThrow('Name is required')
  })

  it('should throw error when address is undefined', () => {
    expect(() => Customer.create('123', 'John Doe').activate()).toThrow(
      'Address is mandatory to activate a customer',
    )
  })

  it('should change name', () => {
    // Arrange
    const customer = Customer.create('123', 'John Doe')

    // Act
    customer.name = 'Jane Doe'

    // Assert
    expect(customer.name).toBe('Jane Doe')
  })

  it('should activate customer', () => {
    // Arrange
    const customer = Customer.create('123', 'John Doe')
    const addres = new Address('Main St', 123, 'Springfield', '12345-123')
    customer.address = addres

    // Act
    customer.activate()

    // Assert
    expect(customer.isActive).toBe(true)
  })

  it('should deactivate customer', () => {
    // Arrange
    const customer = Customer.create('123', 'John Doe')

    // Act
    customer.deactivate()

    // Assert
    expect(customer.isActive).toBe(false)
  })

  it('should add reward points', () => {
    const customer = Customer.create('123', 'John Doe')
    expect(customer.rewardPoints).toBe(0)

    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(10)

    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(20)
  })
})
