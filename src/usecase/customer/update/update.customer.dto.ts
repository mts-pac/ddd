export type InputUpdateCustomerDto = {
  id: string
  name: string
  address: {
    street: string
    number: number
    zip: string
    city: string
  }
}

export type OutputUpdateCustomerDto = {
  id: string
  name: string
  address: {
    street: string
    number: number
    zip: string
    city: string
  }
}
