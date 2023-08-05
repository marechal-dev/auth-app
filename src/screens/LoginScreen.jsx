import { useContext, useState } from 'react';
import { Alert } from 'react-native';

import { authenticateUser } from '../utils/requests';

import LoadingOverlay from '../components/ui/LoadingOverlay';
import AuthContent from '../components/Auth/AuthContent';
import { AuthContext } from '../store/auth-context';

function LoginScreen() {
  const { authenticate } = useContext(AuthContext)
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  async function handleLogin({ email, password }) {
    setIsAuthenticating(true)
    try {
      const token = await authenticateUser({ email, password })
      authenticate(token)
    } catch (error) {
      Alert.alert("Authentication Failed", "Incorrect E-mail or Password! Please check your credentials.")
      setIsAuthenticating(false)
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Authenticating..." />
  }

  return <AuthContent isLogin onAuthenticate={handleLogin} />;
}

export default LoginScreen;