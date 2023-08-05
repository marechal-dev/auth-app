import { axiosRegisterUserClient, axiosSignInClient } from "../lib/axios";

export async function createUser({ email, password }) {
  const response = await axiosRegisterUserClient.post("", {
    email,
    password,
    returnSecureToken: true,
  });

  return response.data.idToken;
}

export async function authenticateUser({ email, password }) {
  const response = await axiosSignInClient.post("", {
    email,
    password,
    returnSecureToken: true,
  });

  return response.data.idToken;
}
