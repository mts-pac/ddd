import EventDispatcher from '../../@shared/event/event-dispatcher'
import Address from '../entity/address'
import CustomerFactory from '../factory/customer.factory'
import CustomerAddressChangedEvent from './customer-address-changed.event'
import CustomerAddressChangedEventHandler from './handler/customer-address-changed.event.handler'

describe('CustomerAddressChangedEvent unit tests', () => {
  it('should register CustomerAddressChangedEvent', () => {
    // Criar um cliente que por sua vez cria um evento CustomerCreatedEvent
    const customer = CustomerFactory.create('Customer 1')
    customer.address = new Address('Rua 1', 1, 'Cidade 1', 'Zip 1')
    let event: CustomerAddressChangedEvent | undefined
    for (const el of customer.pullEvents()) {
      if (el instanceof CustomerAddressChangedEvent) {
        event = el
        break
      }
    }

    expect(event).toBeDefined()
    expect(event).toBeInstanceOf(CustomerAddressChangedEvent)
    expect(event.eventData.address).toBeUndefined()
    expect(event.eventData.newAddress).toBe('Rua 1, 1, Cidade 1, Zip 1')
  })

  it('should dispatch CustomerAddressChangedEvent', () => {
    // Criar um dispatcher de eventos e seu handler
    const dispatcher = new EventDispatcher()
    const handler = new CustomerAddressChangedEventHandler()
    const spyEventHandler = jest.spyOn(handler, 'handle')
    dispatcher.register('CustomerAddressChangedEvent', handler)

    // Criar um cliente que por sua vez cria um evento CustomerCreatedEvent
    const customer = CustomerFactory.create('Customer 1')
    customer.address = new Address('Rua 1', 1, 'Cidade 1', 'Zip 1')
    customer.pullEvents().forEach((el) => dispatcher.notify(el))

    expect(spyEventHandler).toHaveBeenCalled()
    expect(spyEventHandler).toHaveBeenCalledTimes(1)
  })
})
