import CustomerRepositoryInterface from '../../../domain/customer/repository/customer-repository.interface'
import { InputDeleteCustomerDto } from './delete.customer.dto'

export default class DeleteCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository
  }

  async execute(input: InputDeleteCustomerDto): Promise<void> {
    this.customerRepository.delete(input.id)
  }
}
