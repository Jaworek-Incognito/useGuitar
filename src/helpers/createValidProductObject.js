export function createValidProductObject(cartProducts, cart) {
  let products = [];
  for (const [index, cartProduct] of cartProducts.entries()) {
    const { category, imageURL: image, name, price, _id } = cartProduct;
    const { quantity } = cart[index];
    const product = { category, image, name, price, _id, quantity };
    products = [...products, product];
  }
  return products;
}
