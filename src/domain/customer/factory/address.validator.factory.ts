import ValidatorInterface from '../../@shared/validator/validator.interface'
import Address from '../entity/address'
import AddressYupValidator from '../validator/address.yup.validator'

export default class AddressValidatorFactory {
  static create(): ValidatorInterface<Address> {
    return new AddressYupValidator()
  }
}
