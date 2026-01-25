import AddressFactory from '../factory/address.factory'

describe('AddressFactory unit tests', () => {
  it('should create address successfully', () => {
    const address = AddressFactory.create('Main Street', 123, 'Springfield', '12345-123')

    expect(address.street).toBe('Main Street')
    expect(address.number).toBe(123)
    expect(address.city).toBe('Springfield')
    expect(address.zip).toBe('12345-123')
  })
})
