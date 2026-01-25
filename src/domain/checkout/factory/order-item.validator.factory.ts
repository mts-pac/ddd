import ValidatorInterface from '../../@shared/validator/validator.interface'
import OrderItem from '../entity/order-item'
import OrderItemYupValidator from '../validator/order-item.yup.validator'

export default class OrderItemValidatorFactory {
  static create(): ValidatorInterface<OrderItem> {
    return new OrderItemYupValidator()
  }
}
