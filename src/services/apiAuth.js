import axios from "axios";
import { url as baseUrl } from "../utilities/url";
import toast from "react-hot-toast";

export async function LoginApi({ user }) {
  const url = `${baseUrl}/login`;

  try {
    const response = await axios.post(url, user, { withCredentials: true });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
}

export async function LogoutApi() {
  const url = `${baseUrl}/logout`;
  try {
    const response = await axios.delete(url);
    return response.data.msg;
  } catch (error) {
    throw new Error(error.response.data.msg);
  }
}

export async function verifyEmailApi({ email, verificationToken }) {
  const url = `${baseUrl}/verify-email`;
  try {
    const response = await axios.post(url, { email, verificationToken });
    return response.data.msg;
  } catch (error) {
    toast.dismiss();
    toast.error(error.response.data.msg);
    throw new Error(error.response.data.msg);
  }
}

export async function signUpApi(email, password) {
  const url = `${baseUrl}/register`;
  try {
    const response = await axios.post(url, { email, password });

    return response.data.msg;
  } catch (error) {
    toast.dismiss();
    toast.error(error.response.data.msg);
    throw new Error(error.response.data.msg);
  }
}

export async function forgotPasswordApi(email) {
  const url = `${baseUrl}/forgot-password`;
  try {
    const response = await axios.post(url, { email });
    return response.data.msg;
  } catch (error) {
    toast.dismiss();
    toast.error(error.response.data.msg);
    throw new Error(error.response.data.msg);
  }
}

export async function resetPasswordApi(email, password, forgotPasswordToken) {
  const url = `${baseUrl}/reset-password`;
  try {
    const response = await axios.post(url, {
      email,
      password,
      forgotPasswordToken,
    });
    return response.data.msg;
  } catch (error) {
    toast.dismiss();
    toast.error(error.response.data.msg);
    throw new Error(error.response.data.msg);
  }
}
