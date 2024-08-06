import OrderItem from "./order_item";

describe("Orde Item unit  tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => new OrderItem("", "OrderItem 1", 100, "1")).toThrow(
      "Id is required"
    );
  });

  it("should throw error when name is empty", () => {
    expect(() => new OrderItem("1", "", 100, "1")).toThrow("Name is required");
  });

  it("should throw error when price is empty", () => {
    expect(() => new OrderItem("1", "OrderItem 1", 0, "1")).toThrow(
      "Price is required"
    );
  });

  it("should throw error when price is less than zero", () => {
    expect(() => new OrderItem("1", "OrderItem 1", -1, "1")).toThrow(
      "Price must be greater than zero"
    );
  });

  it("should throw error when quantity is less than zero", () => {
    expect(() => new OrderItem("1", "OrderItem 1", 100, "1", -1)).toThrow(
      "Quantity must be greater than zero"
    );
  });
});
