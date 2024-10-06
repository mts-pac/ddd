import EventInterface from './event.interface'

type EventHandlerInterface<T extends EventInterface = EventInterface> = {
  handle(event: T): void
}

export default EventHandlerInterface
