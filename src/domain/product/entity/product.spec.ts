import ProductFactory from '../factory/product.factory'
import Product from './product'

describe('Product unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => new Product(null, 'Product 1', 100)).toThrow('Id is required')
  })

  it('should throw error when name is empty', () => {
    expect(() => ProductFactory.create(null, 100)).toThrow('Name is required')
  })

  it('should throw error when price is empty', () => {
    expect(() => ProductFactory.create('Product 1', null)).toThrow('Price is required')
  })

  it('should throw error when price is less than zero', () => {
    expect(() => ProductFactory.create('Product 1', -1)).toThrow('Price must be greater than zero')
  })

  it('should change name', () => {
    const product = ProductFactory.create('Product 1', 100)
    product.name = 'Product 2'
    expect(product.name).toBe('Product 2')
  })

  it('should change price', () => {
    const product = ProductFactory.create('Product 1', 100)
    product.price = 200
    expect(product.price).toBe(200)
  })
})
