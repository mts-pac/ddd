import EventInterface from '../event/event.interface'

export abstract class AgreggateRoot {
  protected _events: Set<EventInterface> = new Set()

  addEvent(event: EventInterface): void {
    this._events.add(event)
  }

  pullEvents(): Set<EventInterface> {
    const events = new Set(this._events)
    this._events.clear()
    return events
  }
}
