import EventInterface from '../../@shared/event/event.interface'

export default class CustomerCreatedEvent implements EventInterface {
  dataTimeOccured: Date
  eventData: {
    id: string
    name: string
  }

  constructor({ id, name }: { id: string; name: string }) {
    this.dataTimeOccured = new Date()
    this.eventData = {
      id,
      name,
    }
  }
}
