import { useContext, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as SplashScreen from "expo-splash-screen"

import { Colors } from './src/constants/styles';

import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import IconButton from "./src/components/ui/IconButton";

import { AuthContext, AuthProvider } from './src/store/auth-context';

SplashScreen.preventAutoHideAsync()

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const { logout } = useContext(AuthContext)

  function onLogoutButtonPress() {
    logout()
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={onLogoutButtonPress}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const { isAuthenticated } = useContext(AuthContext)

  return (
    <NavigationContainer>
      {
        !isAuthenticated ? <AuthStack /> : <AuthenticatedStack />
      }
    </NavigationContainer>
  );
}

function Root() {
  const { authenticate } = useContext(AuthContext)
  const [appIsReady, setAppIsReady] = useState(false)

  useEffect(() => {
    const fetchAuthToken = async () => {
      const token = await AsyncStorage.getItem("authToken")

      if (token) {
        authenticate(token)
      }

      setAppIsReady(true)
      await SplashScreen.hideAsync()
    }

    fetchAuthToken()
  }, [appIsReady])

  if (!appIsReady) {
    return null;
  }

  return <Navigation />
}

export default function App() {

  return (
    <>
      <StatusBar style="light" />
      <AuthProvider>
        <Root />
      </AuthProvider>
    </>
  );
}