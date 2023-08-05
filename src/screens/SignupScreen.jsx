import { useContext, useState } from 'react';
import { Alert } from 'react-native';

import { createUser } from '../utils/requests';

import { AuthContext } from "../store/auth-context"

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from "../components/ui/LoadingOverlay"

function SignupScreen() {
  const { authenticate } = useContext(AuthContext)
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  async function handleSignUp({ email, password }) {
    setIsAuthenticating(true)
    try {
      const token = await createUser({ email, password })
      authenticate(token)
    } catch (error) {
      Alert.alert("Error", "Could not create your account. Please try again later!")
      setIsAuthenticating(false)
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />
  }

  return (
    <AuthContent
      onAuthenticate={handleSignUp}
    />
  );
}

export default SignupScreen;