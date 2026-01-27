import { app, sequelize } from '../express'
import request from 'supertest'

describe('E2E test for product', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a product', async () => {
    const response = await request(app).post('/product').send({
      name: 'Product 1',
      price: 100,
    })

    expect(response.status).toBe(200)
    expect(response.body.id).toBeDefined()
    expect(response.body.name).toBe('Product 1')
    expect(response.body.price).toBe(100)

    const response2 = await request(app).post(`/product`).set('Accept', 'application/xml').send({
      name: 'Product 1',
      price: 100,
    })

    expect(response2.status).toBe(200)
    expect(response2.body).toBeDefined()
    expect(response2.text).toContain('<?xml version="1.0" encoding="UTF-8"?>')
    expect(response2.text).toContain('<product>')
    expect(response2.text).toContain('<name>Product 1</name>')
    expect(response2.text).toContain('<price>100</price>')
    expect(response2.text).toContain('</product>')
  })

  it('should list all products', async () => {
    const response = await request(app).post('/product').send({
      name: 'Product 1',
      price: 100,
    })
    expect(response.status).toBe(200)

    const response2 = await request(app).post('/product').send({
      name: 'Product 2',
      price: 200,
    })
    expect(response2.status).toBe(200)

    const listResponse = await request(app).get('/product')
    expect(listResponse.status).toBe(200)
    expect(listResponse.body).toBeDefined()
    expect(listResponse.body.products[0].id).toBeDefined()
    expect(listResponse.body.products[0].name).toBe('Product 1')
    expect(listResponse.body.products[0].price).toBe(100)
    expect(listResponse.body.products[1].id).toBeDefined()
    expect(listResponse.body.products[1].name).toBe('Product 2')
    expect(listResponse.body.products[1].price).toBe(200)
    expect(listResponse.body.products.length).toBe(2)

    const listXmlResponse = await request(app).get('/product').set('Accept', 'application/xml')
    expect(listXmlResponse.status).toBe(200)
    expect(listXmlResponse.body).toBeDefined()
    expect(listXmlResponse.text).toContain('<?xml version="1.0" encoding="UTF-8"?>')
    expect(listXmlResponse.text).toContain('<products>')
    expect(listXmlResponse.text).toContain('<product>')
    expect(listXmlResponse.text).toContain('<name>Product 1</name>')
    expect(listXmlResponse.text).toContain('<price>100</price>')
    expect(listXmlResponse.text).toContain('</product>')
    expect(listXmlResponse.text).toContain('<product>')
    expect(listXmlResponse.text).toContain('<name>Product 2</name>')
    expect(listXmlResponse.text).toContain('<price>200</price>')
    expect(listXmlResponse.text).toContain('</product>')
    expect(listXmlResponse.text).toContain('</products>')
  })

  it('should find a product', async () => {
    const response = await request(app).post('/product').send({
      name: 'Product 1',
      price: 100,
    })
    expect(response.status).toBe(200)

    const findResponse = await request(app).get(`/product/${response.body.id}`)
    expect(findResponse.status).toBe(200)
    expect(findResponse.body).toBeDefined()
    expect(findResponse.body.id).toBe(response.body.id)
    expect(findResponse.body.name).toBe('Product 1')
    expect(findResponse.body.price).toBe(100)

    const findXmlResponse = await request(app)
      .get(`/product/${response.body.id}`)
      .set('Accept', 'application/xml')
    expect(findXmlResponse.status).toBe(200)
    expect(findXmlResponse.body).toBeDefined()
    expect(findXmlResponse.text).toContain('<?xml version="1.0" encoding="UTF-8"?>')
    expect(findXmlResponse.text).toContain('<product>')
    expect(findXmlResponse.text).toContain(`<id>${response.body.id}</id>`)
    expect(findXmlResponse.text).toContain('<name>Product 1</name>')
    expect(findXmlResponse.text).toContain('<price>100</price>')
    expect(findXmlResponse.text).toContain('</product>')
  })

  it('should update a product', async () => {
    const response = await request(app).post('/product').send({
      name: 'Product 1',
      price: 100,
    })
    expect(response.status).toBe(200)

    const updateResponse = await request(app)
      .put(`/product/${response.body.id}`)
      .set('Accept', 'application/xml')
      .send({
        name: 'Product 1 Updated',
        price: 150,
      })
    expect(updateResponse.status).toBe(200)
    expect(updateResponse.body).toBeDefined()
    expect(updateResponse.text).toContain('<?xml version="1.0" encoding="UTF-8"?>')
    expect(updateResponse.text).toContain('<product>')
    expect(updateResponse.text).toContain(`<id>${response.body.id}</id>`)
    expect(updateResponse.text).toContain('<name>Product 1 Updated</name>')
    expect(updateResponse.text).toContain('<price>150</price>')
    expect(updateResponse.text).toContain('</product>')

    const updateResponse2 = await request(app).put(`/product/${response.body.id}`).send({
      name: 'Product 1 Updated Again',
      price: 200,
    })
    expect(updateResponse2.status).toBe(200)
    expect(updateResponse2.body.id).toBe(response.body.id)
    expect(updateResponse2.body.name).toBe('Product 1 Updated Again')
    expect(updateResponse2.body.price).toBe(200)
  })

  it('should delete a product', async () => {
    const response = await request(app).post('/product').send({
      name: 'Product 1',
      price: 100,
    })
    expect(response.status).toBe(200)

    const deleteResponse = await request(app).delete(`/product/${response.body.id}`)
    expect(deleteResponse.status).toBe(204)

    const findResponse = await request(app).get(`/product/${response.body.id}`)
    expect(findResponse.status).toBe(500)
  })
})
