import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/firebase';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');

  const reset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Reset Email Sent');
      navigation.goBack();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Enter Email"
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <Button title="Reset Password" onPress={reset} />
    </View>
  );
}