import AddressFactory from '../../../domain/customer/factory/address.factory'
import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface'
import { InputUpdateCustomerDto, OutputUpdateCustomerDto } from './update.customer.dto'
export default class UpdateCustomerUseCase {
  private CustomerRepository: CustomerRepositoryInterface
  constructor(CustomerRepository: CustomerRepositoryInterface) {
    this.CustomerRepository = CustomerRepository
  }

  async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {
    const customer = await this.CustomerRepository.find(input.id)
    customer.name = input.name
    customer.address = AddressFactory.create(
      input.address.street,
      input.address.number,
      input.address.city,
      input.address.zip,
    )

    await this.CustomerRepository.update(customer)

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
