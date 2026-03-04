import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseDB, auth } from "../../firebase/FirebaseConfig";

function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(firebaseDB, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            // fallback from auth
            setUserData({
              name: user.displayName || "User",
              email: user.email,
              uid: user.uid,
            });
          }
          setLoading(false);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading Profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6fef9] flex items-center justify-center px-4 py-0  md:py-8">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6">
        {/* Header */}
        <h2 className="text-xl font-semibold text-center text-gray-700 mb-6">
          My Profile
        </h2>

        {/* Profile Info */}
        <div className="flex flex-col items-center space-y-4">
          <img
            src={userData?.photoURL || "https://via.placeholder.com/100"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover shadow-md"
          />
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800">
              {userData?.name || "User"}
            </h3>
            <p className="text-sm text-gray-500">
              {userData?.email || "No email"}
            </p>
          </div>
          <button
            onClick={() => navigate("/complete-profile")}
            className="bg-[#4CAF50] cursor-alias text-white px-4 py-2 rounded-lg hover:bg-[#3b873e] transition"
          >
            Update Profile
          </button>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-6"></div>

        {/* Additional Info */}
        <div className="text-[11px] sm:text-sm text-gray-700">
          <div className="flex items-center gap-3 pb-0.5">
            <span className="font-semibold w-[22%]">📍 Address:</span>
            <span className="text-gray-600">
              {userData?.address || "Not provided"}
            </span>
          </div>
          <hr />
          <div className="flex items-center gap-3 py-1">
            <span className="font-semibold w-[22%]">📦 Pin Code:</span>
            <span className="text-gray-600">
              {userData?.pincode || "Not provided"}
            </span>
          </div>
          <hr />
          <div className="flex gap-3 mt-1">
            <span className="font-semibold ">📝 Bio: </span>
            <span className="text-gray-600 w-[80%]">
              {userData?.Biography || "Not provided"}...
            </span>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-8 flex justify-center gap-3">
          <button
            onClick={handleSignOut}
            className="text-white hover:text-red-600 cursor-pointer border bg-rose-700 hover:bg-[#ffffff] border-red-500 px-4 py-2 rounded-lg transition-colors duration-300"
          >
            Log Out
          </button>
          <button
            onClick={() => navigate("/orders")}
            className="text-red-600 hover:text-white cursor-pointer border border-red-500 px-4 py-2 rounded-lg hover:bg-rose-700 transition-colors duration-300"
          >
            Your Orders
          </button>
        </div>

        {/* App Version (Optional Footer) */}
        <p className="text-xs text-gray-400 text-center mt-4">
          App version 0.1
        </p>
      </div>
    </div>
  );
}

export default Profile;
