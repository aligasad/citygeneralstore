import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useData } from "../../context/data/MyState";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firebaseDB } from "../../firebase/FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";

function Signup() {
  const context = useData();
  const { loading, setLoading } = context;

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (form.name === "" || form.email === "" || form.password === "") {
      return toast.error("All fields are required");
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
          Noor by <span className="text-[27px] text-[#028732]">Shayan</span> 🌿
        </h2>

        <input
          type="name"
          name="name"
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 mb-6 border border-green-300 bg-[#f9fff9] text-green-900 placeholder-green-500 rounded-lg outline-none focus:ring-2 focus:ring-green-400 transition-all"
        />
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-green-300 bg-[#f9fff9] text-green-900 placeholder-green-500 rounded-lg outline-none focus:ring-2 focus:ring-green-400 transition-all"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 mb-6 border border-green-300 bg-[#f9fff9] text-green-900 placeholder-green-500 rounded-lg outline-none focus:ring-2 focus:ring-green-400 transition-all"
        />

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
