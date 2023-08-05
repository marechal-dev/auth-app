const FIREBASE_AUTH_API_KEY = process.env.EXPO_PUBLIC_FIREBASE_AUTH_API_KEY;

export const FIREBASE_DATABASE_REST_API_URL =
  process.env.EXPO_PUBLIC_FIREBASE_DATABASE_REST_API_URL;
export const FIREBASE_CREATE_USER_REST_API_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_AUTH_API_KEY}`;
export const FIREBASE_SIGN_IN_REST_API_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_AUTH_API_KEY}`;
