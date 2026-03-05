import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/layout/Layout";
import Home from "./pages/home/Home.jsx";
import Order from "./pages/order/Order.jsx";
import Cart from "./pages/cart/Cart.jsx";
import Dashboard from "./pages/admin/dashboard/Dashboard.jsx";
import NoPage from "./pages/nopage/NoPage.jsx";
import MyState from "./context/data/MyState.jsx";
import Login from "./pages/registration/Login.jsx";
import Signup from "./pages/registration/Signup.jsx";
import ProductInfo from "./pages/productInfo/ProductInfo.jsx";
import AddProduct from "./pages/admin/page/AddProduct.jsx";
import UpdateProduct from "./pages/admin/page/UpdateProduct.jsx";
import { ToastContainer, Bounce } from "react-toastify";
import AuthProvider from "./components/protector/AuthContext.jsx";
import ProtectedRoute from "./components/protector/ProtectedRoute.jsx";
import Allproducts from "./pages/allproducts/Allproducts.jsx";
import Serum1 from "./pages/allproducts/Serum/Serum.jsx";
import AboutUs from "./components/aboutUs/AboutUs.jsx";
import Profile from "./components/profile/Profile.jsx";
import CompleteProfile from "./components/profile/CompleteProfile.jsx";
import Soap from "./pages/allproducts/Soap/Soap.jsx";
import LipGloss from "./pages/allproducts/LipGloss/LipGloss.jsx";
import Shampoo from "./pages/allproducts/Shampoo/Shampoo.jsx";
import Choclates from "./pages/allproducts/Choclates/Choclates.jsx";
import { FaArrowUp } from "react-icons/fa";
import Candles from "./pages/allproducts/Candles/Candles.jsx";
import { BsWhatsapp } from "react-icons/bs";
import ReturnPolicy from "./components/aboutUs/ReturnPolicy.jsx";
import TermsAndConditions from "./components/aboutUs/TermsAndCondition.jsx";
import PrivacyPolicy from "./components/aboutUs/PrivacyPolicy.jsx";
import Contact from "./components/Contact/Contact.jsx";
import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/orders",
          element: (
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          ),
        },
        {
          path: "/cart",
          element: (
            <ProtectedRoute>
              <Cart />,
            </ProtectedRoute>
          ),
        },
        {
          path: "/dashboard",
          element: (
            <ProtectedRouteForAdmin>
              <Dashboard />
            </ProtectedRouteForAdmin>
          ),
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/productinfo/:id",
          element: <ProductInfo />,
        },
        {
          path: "/allproducts",
          element: <Allproducts />,
        },
        {
          path: "/serum",
          element: <Serum1 />,
        },
        {
          path: "/shampoo",
          element: <Shampoo />,
        },
        {
          path: "/soap",
          element: <Soap />,
        },
        {
          path: "/lipgloss",
          element: <LipGloss />,
        },
        {
          path: "organicchocolates",
          element: <Choclates />,
        },
        {
          path: "candles",
          element: <Candles />,
        },
        {
          path: "/complete-profile",
          element: <CompleteProfile />,
        },
        {
          path: "about",
          element: <AboutUs />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "/addproduct",
          element: (
            <ProtectedRouteForAdmin>
              <AddProduct />
            </ProtectedRouteForAdmin>
          ),
        },
        {
          path: "/updateproduct",
          element: (
            <ProtectedRouteForAdmin>
              <UpdateProduct />
            </ProtectedRouteForAdmin>
          ),
        },
        {
          path: "/return-policy",
          element: <ReturnPolicy />,
        },
        {
          path: "/privacy-policy",
          element: <PrivacyPolicy />,
        },
        {
          path: "/terms&condition",
          element: <TermsAndConditions />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/*",
          element: <NoPage />,
        },
      ],
    },
  ]);
  // For whatsapp button----------------------
  const handleWhatsAppClick = () => {
    const phoneNumber = "917807040707";
    const message = "Hi, I am interested in your product!";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank"); // opens in new tab
  };

  const [isContactOpen, setIsContactOpen] = useState(false);
  return (
    <>
      {/* // Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="z-20 fixed bottom-8 sm:bottom-3 right-6 bg-[#449474] hover:bg-[#019664] hover:shadow-lg hover:scale-105 text-white p-[10px] cursor-pointer rounded-full shadow-lg transition"
      >
        <FaArrowUp size={25} />
      </button>
      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="z-20 fixed bottom-22 sm:bottom-16 right-6 bg-[#449474] hover:bg-[#019664] hover:shadow-lg hover:scale-105 text-white p-[10px] cursor-pointer rounded-full shadow-lg transition"
      >
        <BsWhatsapp size={25} />
      </button>
      {/* Contact Button */}
      <button
        onClick={() => setIsContactOpen(!isContactOpen)}
        className="cursor-pointer fixed bottom-6 left-6 bg-[#449474] text-white p-[10px] rounded-full shadow-lg hover:bg-[#019664] transition z-50 hover:scale-105"
      >
        {isContactOpen ? (
          <Icon
            icon={"mdi:close"}
            className="text-xl sm:text-2xl text-rose-600 font-bold"
          />
        ) : (
          <Icon
            icon={"mdi:email-arrow-right-outline"}
            className="text-2xl sm:text-3xl"
          />
        )}
      </button>

      {/* Contact Form Panel */}
      {isContactOpen && <Contact onClose={() => setIsContactOpen(false)} />}
      <AnimatePresence mode="wait">
        <AuthProvider>
          <MyState>
            <RouterProvider router={router} />
            <ToastContainer
              position="top-center"
              autoClose={1000}
              theme="dark"
              transition={Bounce}
            />
          </MyState>
        </AuthProvider>
      </AnimatePresence>
    </>
  );
}

export default App;

// for admin protector
const ProtectedRouteForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem("user"));

  if (
    admin.email === "asadalam4291@gmail.com" ||
    admin.email === "asadalamalig@gmail.com"
  ) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};
