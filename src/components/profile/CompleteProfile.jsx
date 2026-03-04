import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { firebaseDB, auth } from "../../firebase/FirebaseConfig";
import { toast } from "react-toastify";

function CompleteProfile() {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const uid = user?.uid;
  const email = user?.email;

  const [form, setForm] = useState({
    name: "",
    email: email || "",
    address: "",
    pincode: "",
    photoURL: "",
    Biography: "",
  });

  // 🔄 Fetch existing user profile
  useEffect(() => {
    if (!uid) {
      alert("Please login first.");
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const docRef = doc(firebaseDB, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setForm((prev) => ({
            ...prev,
            ...data,
          }));
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
        toast.error("Failed to load profile.");
      }
    };

    fetchProfile();
  }, [uid, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!uid) {
      toast.error("User not authenticated");
      return;
    }

    try {
      await setDoc(
        doc(firebaseDB, "users", uid),
        {
          ...form,
        },
        { merge: true },
      );

      toast.success("Profile saved successfully!");
      navigate("/profile");
    } catch (err) {
      console.error("Error saving profile:", err);
      toast.error("Failed to save profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">
          Complete Your Profile
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="email"
          name="email"
          value={form.email}
          disabled
          className="w-full p-2 border rounded bg-gray-100"
        />

        <textarea
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={form.pincode}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <input
          type="url"
          name="photoURL"
          placeholder="Profile Image URL (optional)"
          value={form.photoURL}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <textarea
          name="Biography"
          placeholder="Biography"
          value={form.Biography}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 cursor-pointer transition-colors duration-300 font-semibold"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}

export default CompleteProfile;
// CompleteProfile.jsx
// This component allows users to complete or edit their profile information.
