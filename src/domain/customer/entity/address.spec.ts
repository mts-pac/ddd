import AddressFactory from '../factory/address.factory'

describe('Address unit tests', () => {
  it('should throw error when street is empty', () => {
    expect(() => {
      AddressFactory.create('', 123, 'Springfield', '12345-123')
    }).toThrow('Street is required')
  })

  it('should throw error when number is zero', () => {
    expect(() => {
      AddressFactory.create('Main Street', null, 'Springfield', '12345-123')
    }).toThrow('Number is required')
  })

  it('should throw error when city is empty', () => {
    expect(() => {
      AddressFactory.create('Main Street', 123, '', '12345-123')
    }).toThrow('City is required')
  })

  it('should throw error when zip is empty', () => {
    expect(() => {
      AddressFactory.create('Main Street', 123, 'Springfield', '')
    }).toThrow('Zip is required')
  })

  it('should create address successfully', () => {
    const address = AddressFactory.create('Main Street', 123, 'Springfield', '12345-123')

    expect(address.street).toBe('Main Street')
    expect(address.number).toBe(123)
    expect(address.city).toBe('Springfield')
    expect(address.zip).toBe('12345-123')
  })
})
