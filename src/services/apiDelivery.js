import axios from "axios";
import { url as baseUrl } from "../utilities/url";

export async function getDeliveryCompanies() {
  const url = `${baseUrl}/deliveries`;
  try {
    const response = await axios.get(url);
    return response.data.deliveries;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
}
