import Notification from '../notification/notification'

export abstract class ValueObject {
  public notification: Notification

  constructor() {
    this.notification = new Notification()
  }
}
