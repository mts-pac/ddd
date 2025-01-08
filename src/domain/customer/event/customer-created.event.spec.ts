import EventDispatcher from '../../@shared/event/event-dispatcher'
import Customer from '../entity/customer'
import CustomerCreatedEvent from './customer-created.event'
import Handler1CustomerCreated from './handler/handler-1-customer-created'
import Handler2CustomerCreated from './handler/handler-2-customer-created'

describe('CustomerCreatedEvent unit tests', () => {
  it('should register CustomerCreatedEvent', () => {
    // Criar um cliente que por sua vez cria um evento CustomerCreatedEvent
    const customer = Customer.create('1', 'Customer 1')
    let event: CustomerCreatedEvent | undefined
    for (const el of customer.pullEvents()) {
      if (el instanceof CustomerCreatedEvent) {
        event = el
        break
      }
    }

    expect(event).toBeDefined()
    expect(event).toBeInstanceOf(CustomerCreatedEvent)
    expect(event.eventData.id).toBe('1')
    expect(event.eventData.name).toBe('Customer 1')
  })

  it('should dispatch CustomerCreatedEvent', () => {
    // Criar um dispatcher de eventos e seus handlers
    const dispatcher = new EventDispatcher()
    const handler1 = new Handler1CustomerCreated()
    const handler2 = new Handler2CustomerCreated()
    const spyEventHandler1 = jest.spyOn(handler1, 'handle')
    const spyEventHandler2 = jest.spyOn(handler2, 'handle')
    dispatcher.register('CustomerCreatedEvent', handler1)
    dispatcher.register('CustomerCreatedEvent', handler2)

    // Criar um cliente que por sua vez cria um evento CustomerCreatedEvent
    const customer = Customer.create('1', 'Customer 1')
    customer.pullEvents().forEach((el) => dispatcher.notify(el))

    expect(spyEventHandler1).toHaveBeenCalled()
    expect(spyEventHandler1).toHaveBeenCalledTimes(1)
    expect(spyEventHandler2).toHaveBeenCalled()
    expect(spyEventHandler2).toHaveBeenCalledTimes(1)
  })
})
