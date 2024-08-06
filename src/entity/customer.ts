import Address from "./address";

export default class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = false;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;

    this.validate();
  }

  validate() {
    if (!this._name || this._name.length === 0) {
      throw new Error("Name is required");
    }

    if (!this._id) {
      throw new Error("Id is required");
    }

    return true;
  }

  changeName(name: string): void {
    this._name = name;
    this.validate();
  }

  activate(): void {
    if (!this._address) {
      throw new Error("Address is mandatory to activate a customer");
    }

    this._active = true;
  }

  deactivate(): void {
    this._active = false;
  }

  isActive(): boolean {
    return this._active;
  }

  set address(address: Address) {
    this._address = address;
  }

  get name(): string {
    return this._name;
  }
}
