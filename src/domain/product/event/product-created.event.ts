import EventInterface from '../../@shared/event/event.interface'

export default class ProductCreatedEvent implements EventInterface {
  dataTimeOccured: Date
  eventData: {
    id: string
    name: string
    price: number
  }

  constructor({ id, name, price }: { id: string; name: string; price: number }) {
    this.dataTimeOccured = new Date()
    this.eventData = {
      id,
      name,
      price,
    }
  }
}
