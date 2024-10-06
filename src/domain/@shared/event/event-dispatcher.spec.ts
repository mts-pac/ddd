import SendEmailWhenProductIsCreatedHandler from '../../product/event/handler/send-email-when-product-is-created-handler'
import ProductCreatedEvent from '../../product/event/product-created.event'
import EventDispatcher from './event-dispatcher'

describe('Domain Event Dispatcher Tests', () => {
  it('should register an event', () => {
    const dispatcher = new EventDispatcher()
    const handler = new SendEmailWhenProductIsCreatedHandler()

    dispatcher.register('ProductCreatedEvent', handler)

    expect(dispatcher.handlers['ProductCreatedEvent']).toBeDefined()
    expect(dispatcher.handlers['ProductCreatedEvent']).toEqual([handler])
  })

  it('should unregister an event', () => {
    const dispatcher = new EventDispatcher()
    const handler = new SendEmailWhenProductIsCreatedHandler()

    dispatcher.register('ProductCreatedEvent', handler)
    dispatcher.unregister('ProductCreatedEvent', handler)

    expect(dispatcher.handlers['ProductCreatedEvent']).toBeDefined()
    expect(dispatcher.handlers['ProductCreatedEvent']).toEqual([])
  })

  it('should unregister all events', () => {
    const dispatcher = new EventDispatcher()
    const handler = new SendEmailWhenProductIsCreatedHandler()

    dispatcher.register('ProductCreatedEvent', handler)
    dispatcher.unregisterAll()

    expect(dispatcher.handlers['ProductCreatedEvent']).toBeUndefined()
    expect(dispatcher.handlers).toEqual({})
  })

  it('should notify all event handlers', () => {
    const dispatcher = new EventDispatcher()
    const handler = new SendEmailWhenProductIsCreatedHandler()
    const spyEventHandler = jest.spyOn(handler, 'handle')

    dispatcher.register('ProductCreatedEvent', handler)

    expect(dispatcher.handlers['ProductCreatedEvent']).toBeDefined()
    expect(dispatcher.handlers['ProductCreatedEvent']).toEqual([handler])

    const productCreatedEvent = new ProductCreatedEvent({
      id: '1',
      name: 'Product 1',
      price: 100,
    })

    dispatcher.notify(productCreatedEvent)

    expect(spyEventHandler).toHaveBeenCalled()
  })
})
