import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function ProfileScreen() {
  const { user, logout } = useContext(AuthContext);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22 }}>Profile</Text>

      {user && (
        <>
          <Text>Email: {user.email}</Text>
        </>
      )}

      <Button title="Logout" onPress={logout} />
    </View>
  );
}