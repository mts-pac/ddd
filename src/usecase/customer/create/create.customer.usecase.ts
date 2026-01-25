import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface'
import { InputCreateCustomerDto, OutputCreateCustomerDto } from './create.customer.dto'
import CustomerFactory from '../../../domain/customer/factory/customer.factory'
import AddressFactory from '../../../domain/customer/factory/address.factory'

export default class CreateCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository
  }

  async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
    const customer = CustomerFactory.createWithAddress(
      input.name,
      AddressFactory.create(
        input.address.street,
        input.address.number,
        input.address.city,
        input.address.zip,
      ),
    )

    await this.customerRepository.create(customer)

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        zip: customer.address.zip,
        city: customer.address.city,
      },
    }
  }
}
