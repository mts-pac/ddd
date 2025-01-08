import EventInterface from '../../@shared/event/event.interface'

export default class CustomerAddressChangedEvent implements EventInterface {
  readonly dataTimeOccured: Date
  readonly eventData: {
    id: string
    address: string
    newAddress: string
  }

  constructor({ id, address, newAddress }: { id: string; address: string; newAddress: string }) {
    this.dataTimeOccured = new Date()
    this.eventData = {
      id,
      address,
      newAddress,
    }
  }
}
