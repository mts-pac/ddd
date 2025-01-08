import EventHandlerInterface from '../../../@shared/event/event-handler.interface'
import CustomerAddressChangedEvent from '../customer-address-changed.event'

export default class CustomerAddressChangedEventHandler
  implements EventHandlerInterface<CustomerAddressChangedEvent>
{
  handle(event: CustomerAddressChangedEvent): void {
    const { id, address, newAddress } = event.eventData
    console.log(`Endereço do cliente: ${id}, '${address}' alterado para: '${newAddress}'`)
  }
}
