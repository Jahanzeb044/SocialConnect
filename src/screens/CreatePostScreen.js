import React, { useState, useContext } from 'react';
import { View, TextInput, Button } from 'react-native';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { auth } from '../firebase/firebase';

export default function CreatePostScreen({ navigation }) {
  const [text, setText] = useState('');

  const createPost = async () => {
    if (!text) return;

    await addDoc(collection(db, 'posts'), {
      text,
      userEmail: auth.currentUser.email,
      likes: 0,
      commentsCount: 0,
      createdAt: serverTimestamp(),
    });

    navigation.goBack();
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Write post..."
        value={text}
        onChangeText={setText}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />
      <Button title="Post" onPress={createPost} />
    </View>
  );
}