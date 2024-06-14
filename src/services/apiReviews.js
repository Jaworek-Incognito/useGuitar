import axios from "axios";
import { url as baseUrl } from "../utilities/url";

export async function getProductReviewsApi(id, rating) {
  let url = "";
  url = `${baseUrl}/reviews/product/${id}`;

  if (rating) {
    url = `${baseUrl}/reviews/product/${id}?rating=${rating}`;
  }
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}

export async function createReviewApi({ productId, review }) {
  const url = `${baseUrl}/reviews/product/${productId}`;

  try {
    const response = await axios.post(url, review);
    return response.data.reviews;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
}
