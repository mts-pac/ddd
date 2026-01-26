export type InputCreateCustomerDto = {
  name: string
  address: {
    street: string
    number: number
    zip: string
    city: string
  }
}

export type OutputCreateCustomerDto = {
  id: string
  name: string
  address: {
    street: string
    number: number
    zip: string
    city: string
  }
}
