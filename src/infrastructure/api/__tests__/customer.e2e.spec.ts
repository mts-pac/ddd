import { app, sequelize } from '../express'
import request from 'supertest'

describe('E2E test for customer', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a customer', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: 'John',
        address: {
          street: 'Street',
          city: 'City',
          number: 123,
          zip: '12345',
        },
      })

    expect(response.status).toBe(200)
    expect(response.body.name).toBe('John')
    expect(response.body.address.street).toBe('Street')
    expect(response.body.address.city).toBe('City')
    expect(response.body.address.number).toBe(123)
    expect(response.body.address.zip).toBe('12345')
  })

  it('should not create a customer', async () => {
    const response = await request(app).post('/customer').send({
      name: 'john',
    })
    expect(response.status).toBe(500)
  })

  it('should list all customer', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: 'John',
        address: {
          street: 'Street',
          city: 'City',
          number: 123,
          zip: '12345',
        },
      })
    expect(response.status).toBe(200)
    const response2 = await request(app)
      .post('/customer')
      .send({
        name: 'Jane',
        address: {
          street: 'Street 2',
          city: 'City 2',
          number: 1234,
          zip: '12344',
        },
      })
    expect(response2.status).toBe(200)

    const listResponse = await request(app).get('/customer').send()

    expect(listResponse.status).toBe(200)
    expect(listResponse.body.customers.length).toBe(2)
    const customer = listResponse.body.customers[0]
    expect(customer.name).toBe('John')
    expect(customer.address.street).toBe('Street')
    const customer2 = listResponse.body.customers[1]
    expect(customer2.name).toBe('Jane')
    expect(customer2.address.street).toBe('Street 2')

    const listResponseXML = await request(app)
      .get('/customer')
      .set('Accept', 'application/xml')
      .send()

    expect(listResponseXML.status).toBe(200)
    expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`)
    expect(listResponseXML.text).toContain(`<customers>`)
    expect(listResponseXML.text).toContain(`<customer>`)
    expect(listResponseXML.text).toContain(`<name>John</name>`)
    expect(listResponseXML.text).toContain(`<address>`)
    expect(listResponseXML.text).toContain(`<street>Street</street>`)
    expect(listResponseXML.text).toContain(`<city>City</city>`)
    expect(listResponseXML.text).toContain(`<number>123</number>`)
    expect(listResponseXML.text).toContain(`<zip>12345</zip>`)
    expect(listResponseXML.text).toContain(`</address>`)
    expect(listResponseXML.text).toContain(`</customer>`)
    expect(listResponseXML.text).toContain(`<name>Jane</name>`)
    expect(listResponseXML.text).toContain(`<street>Street 2</street>`)
    expect(listResponseXML.text).toContain(`</customers>`)
  })

  it('should find a customer', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: 'John',
        address: {
          street: 'Street',
          city: 'City',
          number: 123,
          zip: '12345',
        },
      })
    expect(response.status).toBe(200)
    const customerId = response.body.id

    const findResponse = await request(app).get(`/customer/${customerId}`).send()

    expect(findResponse.status).toBe(200)
    expect(findResponse.body.name).toBe('John')
    expect(findResponse.body.address.street).toBe('Street')

    const findResponseXML = await request(app)
      .get(`/customer/${customerId}`)
      .set('Accept', 'application/xml')
      .send()

    expect(findResponseXML.status).toBe(200)
    expect(findResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`)
    expect(findResponseXML.text).toContain(`<customer>`)
    expect(findResponseXML.text).toContain(`<name>John</name>`)
    expect(findResponseXML.text).toContain(`<address>`)
    expect(findResponseXML.text).toContain(`<street>Street</street>`)
    expect(findResponseXML.text).toContain(`<city>City</city>`)
    expect(findResponseXML.text).toContain(`<number>123</number>`)
    expect(findResponseXML.text).toContain(`<zip>12345</zip>`)
    expect(findResponseXML.text).toContain(`</address>`)
    expect(findResponseXML.text).toContain(`</customer>`)
  })

  it('should update a customer', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: 'John',
        address: {
          street: 'Street',
          city: 'City',
          number: 123,
          zip: '12345',
        },
      })
    expect(response.status).toBe(200)
    const customerId = response.body.id

    const updateResponse = await request(app)
      .put(`/customer/${customerId}`)
      .set('Accept', 'application/xml')
      .send({
        name: 'John Updated',
        address: {
          street: 'Street Updated',
          city: 'City Updated',
          number: 321,
          zip: '54321',
        },
      })

    expect(updateResponse.status).toBe(200)
    expect(updateResponse.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`)
    expect(updateResponse.text).toContain(`<customer>`)
    expect(updateResponse.text).toContain(`<name>John Updated</name>`)
    expect(updateResponse.text).toContain(`<address>`)
    expect(updateResponse.text).toContain(`<street>Street Updated</street>`)
    expect(updateResponse.text).toContain(`<city>City Updated</city>`)
    expect(updateResponse.text).toContain(`<number>321</number>`)
    expect(updateResponse.text).toContain(`<zip>54321</zip>`)
    expect(updateResponse.text).toContain(`</address>`)
    expect(updateResponse.text).toContain(`</customer>`)
  })

  it('should not update a customer', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: 'John',
        address: {
          street: 'Street',
          city: 'City',
          number: 123,
          zip: '12345',
        },
      })
    expect(response.status).toBe(200)
    const customerId = response.body.id

    const updateResponse = await request(app).put(`/customer/${customerId}`).send({})

    expect(updateResponse.status).toBe(500)
  })

  it('should delete a customer', async () => {
    const response = await request(app)
      .post('/customer')
      .send({
        name: 'John',
        address: {
          street: 'Street',
          city: 'City',
          number: 123,
          zip: '12345',
        },
      })
    expect(response.status).toBe(200)
    const customerId = response.body.id

    const deleteResponse = await request(app).delete(`/customer/${customerId}`).send()

    expect(deleteResponse.status).toBe(204)
    const findResponse = await request(app).get(`/customer/${customerId}`).send()
    expect(findResponse.status).toBe(500)
  })
})
