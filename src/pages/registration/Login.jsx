import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, googleProvider } from "../../firebase/FirebaseConfig";
import { useData } from "../../context/data/MyState";
import Loader from "../../components/loader/Loader";
import { signInWithPopup } from "firebase/auth";
import { Icon } from "@iconify/react/dist/iconify.js";

function Login() {
  const navigate = useNavigate();
  const context = useData();
  const { loading, setLoading } = context;
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
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

    if (!form.email) {
      return toast.warning("Please enter your email...");
    }

    // 🔥 IF FORGOT MODE
    if (isForgotMode) {
      return handleForgotPassword();
    }

    if (!form.password) {
      return toast.warning("Please enter your password...");
    }

    try {
      setLoading(true);

      const result = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password,
      );

      localStorage.setItem("user", JSON.stringify(result.user));
      toast.success("Login Successfully...!");
      navigate("/");
    } catch (error) {
      toast.error("Invalid Email or Password!");
    } finally {
      setLoading(false);
    }
  }

  // Handle forget password

  const [isForgotMode, setIsForgotMode] = useState(false);
  const handleForgotPassword = async () => {
    if (!form.email) {
      return toast.warning("Please enter your email first.");
    }

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, form.email);
      toast.success("Password reset link sent to your email 📩");
      setIsForgotMode(false); // optional auto return
    } catch (error) {
      toast.error("Failed to send reset email!");
    } finally {
      setLoading(false);
    }
  };

  // Function to handle Google login----------------------------------------
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      localStorage.setItem("user", JSON.stringify(result.user));
      toast.success("Login with Google Successful! 🎉");
      navigate("/");
      setLoading(false);
    } catch (error) {
      toast.error("Google login failed!");
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {loading && <Loader />}
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#e8f5e9] to-[#f1f8e9] p-4">
        <form
          className="bg-white p-8 rounded-2xl w-96 shadow-xl max-w-md border border-green-200 transition-all duration-300 hover:shadow-2xl"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-green-900">
            City <span className="text-[27px] text-[#028732]">General</span>{" "}
            Store
          </h2>

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

          {!isForgotMode && (
            <div className="relative mb-5">
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-3 pl-12 border border-[#FFA673] bg-[#FFE3BB]/50 rounded-xl outline-none focus:ring-2 focus:ring-[#03A6A1]"
              />
              {/* Key Icon */}
              <span
                className={`absolute left-4 top-3 ${showPassword ? "text-[#03A6A1]" : "text-red-600"}`}
              >
                <Icon
                  width="22"
                  icon={showPassword ? "mdi:lock-open" : "mdi:lock-off"}
                />
              </span>

              {/* Eye Toggle Icon */}
              <span
                className={`absolute right-4 top-3 cursor-pointer ${showPassword ? "text-red-600" : "text-[#03A6A1]"}`}
                onClick={() => setShowPassword(!showPassword)}
              >
                <Icon
                  icon={
                    showPassword
                      ? "mdi:eye-off-outline"
                      : "mdi:eye-outline"
                  }
                  width="22"
                />
              </span>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-lime-500 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg hover:from-green-700 hover:to-lime-600 transition-all cursor-pointer"
          >
            {isForgotMode ? "Send Reset Link" : "Login"}
          </button>
          <div className="flex justify-end mb-4">
            {!isForgotMode ? (
              <button
                type="button"
                onClick={() => setIsForgotMode(true)}
                className="text-lime-600 hover:text-lime-800 underline cursor-pointer"
              >
                Forgot Password?
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsForgotMode(false)}
                className="text-green-700 hover:text-green-900 underline cursor-pointer"
              >
                Return to Login
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-1.5 mt-4 bg-gradient-to-r from-rose-700 to-lime-500 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg hover:from-white hover:to-lime-600 transition-all cursor-pointer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/3840px-Google_%22G%22_logo.svg.png"
              width={20}
              alt=""
            />
            Login with Google
          </button>

          <p className="mt-6 text-center text-green-700 font-medium">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-lime-600 hover:text-lime-800 font-semibold underline transition-all"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
