import { db } from "./firebase-config"; // Check karein aapki config file ka naam yahi hai
import { doc, writeBatch, serverTimestamp, getDoc } from "firebase/firestore";

// Follow aur Unfollow dono ka kaam yahi function karega
export const toggleFollow = async (currentUserId, targetUserId, isFollowing) => {
  const batch = writeBatch(db);

  // 1. Aapki 'following' list ka reference
  const followingRef = doc(db, "users", currentUserId, "following", targetUserId);
  // 2. Dusre user ki 'followers' list ka reference
  const followerRef = doc(db, "users", targetUserId, "followers", currentUserId);

  if (!isFollowing) {
    // Agar follow nahi kiya hua, toh add karo
    batch.set(followingRef, { timestamp: serverTimestamp() });
    batch.set(followerRef, { timestamp: serverTimestamp() });
  } else {
    // Agar pehle se follow kiya hai, toh delete karo (Unfollow)
    batch.delete(followingRef);
    batch.delete(followerRef);
  }

  // Dono kaam ek saath save honge
  await batch.commit();
};