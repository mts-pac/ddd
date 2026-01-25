import ValidatorInterface from '../../@shared/validator/validator.interface'
import OrderItem from '../entity/order-item'
import * as yup from 'yup'

export default class OrderItemYupValidator implements ValidatorInterface<OrderItem> {
  validate(entity: OrderItem): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required('Id is required'),
          name: yup.string().required('Name is required'),
          price: yup
            .number()
            .required('Price is required')
            .min(0, 'Price must be greater than zero'),
          quantity: yup
            .number()
            .required('Quantity is required')
            .min(0, 'Quantity must be greater than zero'),
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
            price: entity.price,
            quantity: entity.quantity,
          },
          {
            abortEarly: false,
          },
        )
    } catch (errors) {
      const e = errors as yup.ValidationError
      e.errors.forEach((error) => {
        entity.notification.addError({
          context: 'OrderItem',
          message: error,
        })
      })
    }
  }
}
