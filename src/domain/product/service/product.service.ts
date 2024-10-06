import Product from '../entity/product'

export default class ProductService {
  static increasePrice(products: Product[], percentage: number) {
    products.forEach((product) => {
      product.price += (product.price * percentage) / 100
    })
  }
}
