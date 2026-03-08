import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase';

import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import CommentsScreen from '../screens/CommentsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="CreatePost" component={CreatePostScreen} />
          <Stack.Screen name="Comments" component={CommentsScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}