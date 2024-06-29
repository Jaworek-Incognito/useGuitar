import axios from "axios";
import { url as baseUrl } from "../utilities/url";
import toast from "react-hot-toast";

export async function getCurrentUserApi() {
  const url = `${baseUrl}/users/getCurrentUser`;
  try {
    const response = await axios.get(url);
    return response.data.user;
  } catch (error) {
    if (error.response.status === 401) {
      return error.response.status;
    }
    throw new Error(error.response.data.msg);
  }
}

export async function updateOrderingUserApi(user) {
  const url = `${baseUrl}/users`;
  try {
    const response = await axios.patch(url, user);
    return response.data.user;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
}

export async function updateUserPassword(data) {
  const url = `${baseUrl}/users/updatePassword`;
  try {
    const response = await axios.patch(url, data);
    return response.data.msg;
  } catch (error) {
    toast.error(error.response.data.msg);
    throw new Error(error.response.data.msg);
  }
}
