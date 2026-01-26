import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface'
import { InputDeleteProductDto } from './delete.product.dto'

export default class DeleteCustomerUseCase {
  private productRepository: ProductRepositoryInterface

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository
  }

  async execute(input: InputDeleteProductDto): Promise<void> {
    this.productRepository.delete(input.id)
  }
}
