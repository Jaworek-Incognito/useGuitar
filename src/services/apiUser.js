import axios from "axios";
import { url as baseUrl } from "../utilities/url";

export async function GetCurrentUserApi() {
  const url = `${baseUrl}/users/getCurrentUser`;
  try {
    const response = await axios.get(url);
    return response.data.user;
  } catch (error) {
    window.location.href = "http://localhost:5173/login";
    throw new Error(error.response.data.msg);
  }
}

export async function UpdateOrderingUserApi(user) {
  const url = `${baseUrl}/users`;
  try {
    const response = await axios.patch(url, user);
    return response.data.user;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
}
