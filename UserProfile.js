import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { toggleFollow } from "../firebaseUtils";

const UserProfile = ({ targetUserId }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentUserId = auth.currentUser?.uid;

  // Check karna ke kya hum is user ko pehle se follow kar rahe hain
  useEffect(() => {
    const checkFollowStatus = async () => {
      if (currentUserId && targetUserId) {
        const docRef = doc(db, "users", currentUserId, "following", targetUserId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setIsFollowing(true);
        }
      }
    };
    checkFollowStatus();
  }, [currentUserId, targetUserId]);

  // Button click hone par kya hoga
  const handleFollowAction = async () => {
    setLoading(true);
    try {
      await toggleFollow(currentUserId, targetUserId, isFollowing);
      setIsFollowing(!isFollowing); // UI update kar do
    } catch (error) {
      console.error("Error updating follow status:", error);
    }
    setLoading(false);
  };

  return (
    <div className="profile-card">
      {/* Agar apni profile hai toh button nahi dikhega */}
      {currentUserId !== targetUserId && (
        <button 
          onClick={handleFollowAction} 
          disabled={loading}
          style={{
            backgroundColor: isFollowing ? "#ccc" : "#0095f6",
            color: "white",
            padding: "8px 16px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer"
          }}
        >
          {loading ? "Processing..." : isFollowing ? "Unfollow" : "Follow"}
        </button>
      )}
    </div>
  );
};

export default UserProfile;