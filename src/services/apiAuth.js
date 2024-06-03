import axios from "axios";
import { url as baseUrl } from "../utilities/url";

export async function LoginApi({ user }) {
  const url = `${baseUrl}/login`;

  try {
    const response = await axios.post(url, user, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
}
