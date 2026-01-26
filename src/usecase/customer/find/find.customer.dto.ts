export type InputFindCustomerDto = {
  id: string
}

export type OutputFindCustomerDto = {
  id: string
  name: string
  address: {
    street: string
    city: string
    number: number
    zip: string
  }
}
