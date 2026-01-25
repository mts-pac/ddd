import ValidatorInterface from '../../@shared/validator/validator.interface'
import * as yup from 'yup'
import Order from '../entity/order'

export default class OrderYupValidator implements ValidatorInterface<Order> {
  validate(entity: Order): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required('Id is required'),
          customerId: yup.string().required('CustomerId is required'),
          items: yup.array().min(1, 'Items are required').required('Items are required'),
        })
        .validateSync(
          {
            id: entity.id,
            customerId: entity.customerId,
            items: entity.items,
          },
          {
            abortEarly: false,
          },
        )
    } catch (errors) {
      const e = errors as yup.ValidationError
      e.errors.forEach((error) => {
        entity.notification.addError({
          context: 'order',
          message: error,
        })
      })
    }
  }
}
