import EventDispatcherInterface from './event-dispatcher.interface'
import EventHandlerInterface from './event-handler.interface'
import EventInterface from './event.interface'

export default class EventDispatcher implements EventDispatcherInterface {
  private _handlers: { [eventName: string]: EventHandlerInterface[] } = {}

  get handlers(): { [eventName: string]: EventHandlerInterface[] } {
    return this._handlers
  }

  notify(event: EventInterface): void {
    const eventName = event.constructor.name
    if (!this._handlers[eventName]) {
      return
    }

    this._handlers[eventName].forEach((handler) => {
      handler.handle(event)
    })
  }

  register(eventName: string, handler: EventHandlerInterface): void {
    if (!this._handlers[eventName]) {
      this._handlers[eventName] = []
    }

    this._handlers[eventName].push(handler)
  }

  unregister(eventName: string, handler: EventHandlerInterface): void {
    if (!this._handlers[eventName]) {
      return
    }

    const index = this._handlers[eventName].indexOf(handler)
    if (index !== -1) {
      this._handlers[eventName].splice(index, 1)
    }
  }

  unregisterAll(): void {
    this._handlers = {}
  }
}
