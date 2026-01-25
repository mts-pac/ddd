import EventInterface from '../event/event.interface'
import Notification from '../notification/notification'

export abstract class AgreggateRoot {
  protected _events: Set<EventInterface> = new Set()
  public notification: Notification

  constructor() {
    this.notification = new Notification()
  }

  addEvent(event: EventInterface): void {
    this._events.add(event)
  }

  pullEvents(): Set<EventInterface> {
    const events = new Set(this._events)
    this._events.clear()
    return events
  }
}
