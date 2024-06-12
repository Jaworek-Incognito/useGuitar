import axios from "axios";
import { url as baseUrl } from "../utilities/url";
import setLocalStorageItem from "../helpers/setLocalStorageItem";

export async function getProductsApi(sortBy, name) {
  let url = `${baseUrl}/products`;
  if (name || sortBy) {
    url = `${url}?`;
  }
  if (name) {
    url = `${url}name=${name}`;
  }
  if (sortBy) {
    url = `${url}&sortBy=${sortBy}`;
  } else {
    url = `${url}?&sortBy=-createdAt`;
  }

  try {
    const response = await axios.get(url);
    return response.data.products;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
}

export async function getSpecificProductsApi({ category, params }) {
  let url = `${baseUrl}/products/category/${category}?`;

  params.forEach((arrayEl) => {
    const [field, value] = arrayEl;
    url = `${url}${field}=${value}&`;
  });

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
}

export async function getProductApi(name) {
  name = name.replaceAll("_", " ");

  let url = `${baseUrl}/products/${name}`;
  try {
    const response = await axios.get(url);
    return response.data.product;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
}

export async function getCartProductsApi(idArray) {
  if (!idArray || idArray.length === 0) return null;
  let url = `${baseUrl}/products/getMyCart/`;
  idArray.forEach((id) => {
    url = `${url}${id}-`;
  });

  try {
    const response = await axios.get(url);
    return response.data.products;
  } catch (error) {
    setLocalStorageItem("cart", []);
    throw new Error(error.response.data.msg);
  }
}

export async function getDiscountedProductsApi() {
  const url = `${baseUrl}/products/discountedProducts`;
  try {
    const response = await axios.get(url);
    return response.data.products;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
}

export async function getFeaturedProductsApi() {
  const url = `${baseUrl}/products/featuredProducts`;
  try {
    const response = await axios.get(url);
    return response.data.products;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
}
