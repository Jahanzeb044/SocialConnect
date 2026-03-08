import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import { collection, addDoc, onSnapshot, doc, updateDoc, increment, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export default function CommentsScreen({ route }) {
  const { postId } = route.params;
  const [comment, setComment] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'posts', postId, 'comments'),
      snapshot => {
        setComments(snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })));
      }
    );

    return unsubscribe;
  }, []);

  const addComment = async () => {
    if (!comment) return;

    await addDoc(collection(db, 'posts', postId, 'comments'), {
      text: comment,
      createdAt: serverTimestamp(),
    });

    // Increase comment count
    const postRef = doc(db, 'posts', postId);
    await updateDoc(postRef, {
      commentsCount: increment(1),
    });

    setComment('');
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>💬 {item.text}</Text>
        )}
      />

      <TextInput
        placeholder="Add comment..."
        value={comment}
        onChangeText={setComment}
        style={{ borderWidth: 1, padding: 8 }}
      />

      <Button title="Post Comment" onPress={addComment} />
    </View>
  );
}