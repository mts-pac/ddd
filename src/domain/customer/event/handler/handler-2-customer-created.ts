import EventHandlerInterface from '../../../@shared/event/event-handler.interface'
import CustomerCreatedEvent from '../customer-created.event'

export default class Handler2CustomerCreated
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handle(_event: CustomerCreatedEvent) : void {
    console.log(`Esse é o segundo console.log do evento: CustomerCreated`)
  }
}
