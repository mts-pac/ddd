import Address from '../entity/address'

export default class {
  public static create(street: string, number: number, city: string, zip: string): Address {
    return new Address(street, number, city, zip)
  }
}
