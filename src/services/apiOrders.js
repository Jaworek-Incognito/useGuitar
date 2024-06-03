import axios from "axios";
import { url as baseUrl } from "../utilities/url";

export async function createOrderApi({ body }) {
  const url = `${baseUrl}/orders`;
  try {
    const response = await axios.post(url, body);
    return response.data.order;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
}

export async function getOrderApi(id) {
  const url = `${baseUrl}/orders/${id}`;
  try {
    const response = await axios.get(url);
    return response.data.order;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
}

export async function updateStatusOrderApi(id) {
  const url = `${baseUrl}/orders/${id}`;
  try {
    const response = await axios.patch(url);
    return response.data.order;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
}
