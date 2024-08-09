// Value Object (is immutable)
export default class Address {
  private readonly _street: string;
  private readonly _number: number = 0;
  private readonly _zip: string;
  private readonly _city: string;

  constructor(street: string, number: number, city: string, zip: string) {
    this._street = street;
    this._number = number;
    this._city = city;
    this._zip = zip;
    this.validate();
  }

  validate() {
    if (!this._street || this._street.length === 0) {
      throw new Error("Street is required");
    }

    if (!this._city || this._city.length === 0) {
      throw new Error("City is required");
    }

    if (!this._zip || this._zip.length === 0) {
      throw new Error("Zip is required");
    }

    if (this._number == 0) {
      throw new Error("Number is required");
    }
  }

  toString() {
    return `${this._street} ${this._number}, ${this._zip} ${this._city}`;
  }

  get street(): string {
    return this._street;
  }

  get number(): number {
    return this._number;
  }

  get zip(): string {
    return this._zip;
  }

  get city(): string {
    return this._city;
  }
}
