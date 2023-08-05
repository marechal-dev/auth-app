import axios from "axios";

import {
  FIREBASE_DATABASE_REST_API_URL,
  FIREBASE_CREATE_USER_REST_API_URL,
  FIREBASE_SIGN_IN_REST_API_URL,
} from "../constants/env";

export const axiosRegisterUserClient = axios.create({
  baseURL: FIREBASE_CREATE_USER_REST_API_URL,
});

export const axiosSignInClient = axios.create({
  baseURL: FIREBASE_SIGN_IN_REST_API_URL,
});

export const axiosDatabaseClient = axios.create({
  baseURL: FIREBASE_DATABASE_REST_API_URL,
});
