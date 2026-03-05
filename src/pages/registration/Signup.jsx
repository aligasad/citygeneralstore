import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/data/MyState";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firebaseDB } from "../../firebase/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { Icon } from "@iconify/react/dist/iconify.js";

function Signup() {
  const context = useData();
  const { loading, setLoading } = context;
  // Hide and show password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      form.name === "" ||
      form.email === "" ||
      form.password === "" ||
      form.confirmPassword === ""
    ) {
      return toast.error("All fields are required");
    }

    if (form.password !== form.confirmPassword) {
      return toast.error("Password and Confirm Password do not match");
    }

    if (form.password < 6) {
      return toast.warning("Password must be at least 6 characters");
    }

    try {
      const users = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password,
      );

      await setDoc(doc(firebaseDB, "users", users.user.uid), {
        name: form.name,
        email: users.user.email,
        uid: users.user.uid,
        signedupAt: new Date().toISOString(),
      });

      setForm({ name: "", email: "", password: "" });

      toast.success("Register Successfully!");
    } catch (error) {
      toast.warning("Already Registered..");
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex justify-center items-center bg-[#f1fdee] min-h-screen">
      <form
        className="bg-white p-8 rounded-xl shadow-lg w-96 border border-green-200"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-green-900">
          City <span className="text-[27px] text-[#028732]">General</span> Store
        </h2>

        {/* Name */}
        <div className="relative mb-5">
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 pl-12 border border-[#FFA673] bg-[#FFE3BB]/50 rounded-xl outline-none focus:ring-2 focus:ring-[#03A6A1]"
          />
          <span className="absolute left-4 top-3 text-[#03A6A1]">
            <Icon width={24} icon={"mdi:account"} />
          </span>
        </div>

        {/* Email */}
        <div className="relative mb-5">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 pl-12 border border-[#FFA673] bg-[#FFE3BB]/50 rounded-xl outline-none focus:ring-2 focus:ring-[#03A6A1]"
          />
          <span className="absolute left-4 top-3 text-[#03A6A1]">
            <Icon width={22} icon={"mdi:email-edit-outline"} />
          </span>
        </div>

        {/* Password */}
        <div className="relative mb-5">
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 pl-12 border border-[#FFA673] bg-[#FFE3BB]/50 rounded-xl outline-none focus:ring-2 focus:ring-[#03A6A1]"
          />
          <span className="absolute left-4 top-3 text-red-600">
            <Icon width={22} icon={"mdi:lock"} />
          </span>
        </div>

        {/* Confirm Password */}
        <div className="relative mb-8">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full p-3 pl-12 pr-12 border border-[#FFA673] bg-[#FFE3BB]/50 rounded-xl outline-none focus:ring-2 focus:ring-[#03A6A1]"
          />

          {/* Key Icon */}
          <span
            className={`absolute left-4 top-3 ${showConfirmPassword ? "text-[#03A6A1]" : "text-red-600"}`}
          >
            <Icon
              width="22"
              icon={showConfirmPassword ? "mdi:lock-open" : "mdi:lock-off"}
            />
          </span>

          {/* Eye Toggle Icon */}
          <span
            className={`absolute right-4 top-3 cursor-pointer ${showConfirmPassword ? "text-red-600" : "text-[#03A6A1]"}`}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Icon
              icon={
                showConfirmPassword ? "mdi:eye-off-outline" : "mdi:eye-outline"
              }
              width="22"
            />
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-600 to-lime-500 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg hover:from-green-700 hover:to-lime-600 transition-all cursor-pointer"
        >
          SignUp
        </button>

        <p className="mt-4 text-center text-green-700">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-600 underline hover:text-green-800"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
