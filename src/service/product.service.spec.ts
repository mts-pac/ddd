import Product from "../entity/product";
import ProductService from "./product.service";

describe("Product service unit tests", () => {
  it("should change the prices of all products", () => {
    const book = new Product("1", "Book", 10);
    const pen = new Product("2", "Pen", 5);
    const products = [book, pen];

    ProductService.increasePrice(products, 100);

    expect(book.price).toBe(20);
    expect(pen.price).toBe(10);
  });
});
