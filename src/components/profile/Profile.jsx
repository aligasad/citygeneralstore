import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged, signOut, updatePassword } from "firebase/auth";
import { firebaseDB, auth } from "../../firebase/FirebaseConfig";

function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(()=> {
    window.scrollTo({top:0, behavior: "smooth"});
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(firebaseDB, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
            const data = docSnap.data();
            setUserData(data);
            // ⭐ header ke liye save karo
            localStorage.setItem("profile", JSON.stringify(data));
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

  // Update Password
  const handleUpdatePassword = async () => {
    if (!newPassword || !confirmPassword) {
      return alert("Please fill all fields");
    }

    if (newPassword !== confirmPassword) {
      return alert("Passwords do not match");
    }

    if (newPassword.length < 6) {
      return alert("Password must be at least 6 characters");
    }

    try {
      const user = auth.currentUser;

      await updatePassword(user, newPassword);

      alert("Password updated successfully ✅");

      setNewPassword("");
      setConfirmPassword("");
      setShowPasswordForm(false);
    } catch (error) {
      if (error.code === "auth/requires-recent-login") {
        alert("Please logout and login again before changing password.");
      } else {
        alert(error.message);
      }
    }
  };

  

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

          {/* Update Password Button */}
          <div className="mt-6 text-center flex items-center gap-2">
            <button
              onClick={() => navigate("/complete-profile")}
              className="bg-[#4CAF50] cursor-alias text-white px-3 py-[6px] rounded-lg hover:bg-[#3b873e] transition"
            >
              Update Profile
            </button>
            <button
              onClick={() => setShowPasswordForm(!showPasswordForm)}
              className="bg-indigo-600 text-white px-3 py-[6px] rounded-lg hover:bg-indigo-700 transition cursor-pointer"
            >
              Update Password
            </button>
          </div>

          {/* Password Form */}
          {showPasswordForm && (
            <div className="mt-4 space-y-3">
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border rounded-lg"
              />
              <button
                onClick={handleUpdatePassword}
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition cursor-pointer"
              >
                Save New Password
              </button>
            </div>
          )}
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
