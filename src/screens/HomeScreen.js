import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Button } from 'react-native';
import { collection, onSnapshot, doc, updateDoc, increment, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';

export default function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })));
    });

    return unsubscribe;
  }, []);

  const likePost = async (id) => {
    const postRef = doc(db, 'posts', id);
    await updateDoc(postRef, {
      likes: increment(1),
    });
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Button title="Create Post" onPress={() => navigation.navigate('CreatePost')} />
      <Button title="Logout" onPress={() => signOut(auth)} />

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ borderWidth: 1, padding: 10, marginVertical: 5 }}>
            <Text>{item.userEmail}</Text>
            <Text>{item.text}</Text>

            <Text>❤️ Likes: {item.likes}</Text>
            <Text>💬 Comments: {item.commentsCount}</Text>

            <Button title="Like" onPress={() => likePost(item.id)} />
            <Button
              title="Comments"
              onPress={() => navigation.navigate('Comments', { postId: item.id })}
            />
          </View>
        )}
      />
    </View>
  );
}