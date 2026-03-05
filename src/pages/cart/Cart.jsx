import React, { useContext, useEffect, useState } from "react";
import { useData } from "../../context/data/MyState";
import Modal from "../../components/modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  RiDeleteBin6Fill,
  RiDiscountPercentFill,
  RiDiscountPercentLine,
} from "react-icons/ri";
import { FaIndianRupeeSign, FaRupeeSign } from "react-icons/fa6";
import {
  decreaseQuantity,
  deleteFromCart,
  increaseQuantity,
} from "../../redux/CartSlice";
import { toast } from "react-toastify";
import { addDoc, doc, setDoc, collection, getDoc } from "firebase/firestore";
import { auth, firebaseDB } from "../../firebase/FirebaseConfig";
import NoOrderFound from "../../components/noorder/NoOrderFound";
import { onAuthStateChanged } from "firebase/auth";
import { original } from "@reduxjs/toolkit";
import { FaMinus, FaPlus } from "react-icons/fa";

function Cart() {
  const context = useData();
  const { mode, calcOffer } = context;
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart);
  console.log(cartItems);

  // delete item from cart---------------------------------------------
  const deleteCart = (item) => {
    dispatch(deleteFromCart(item));
    toast.warning("delete item sucessfully");
  };

  // also delete from local storage-------------------------------------
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // For calculating total amount of all product------------------------
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem) => {
      const qty = cartItem.quan || 1;
      temp = Number(temp) + parseFloat(calcOffer(cartItem.price)) * qty;
    });
    setTotalAmount(temp);
  }, [cartItems]);

  // Calculate GST------------------ -- -- -- -- -- -- -- --
  const calcGST = (price) => {
    let discount = 0.18;
    const discountedPrice = price * discount;
    return discountedPrice.toFixed(2);
  };

  const GST = calcGST(totalAmount);

  const shipping = Number(5); // Flat shipping cost


  const grandTotal = totalAmount > 60 ? totalAmount.toFixed(2) : (totalAmount === 0 ? totalAmount.toFixed(2): (totalAmount + shipping).toFixed(2))

  // extracting user information from firebase-----------------------------
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(firebaseDB, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log("No such profile in Firestore!");
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  // =============================================================================
  // ----------------------------PAYMENT INTEGRATION CODE ------------------------
  // =============================================================================
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const buyNow = async (method) => {
    // validation
    if (name === "" || address == "" || pincode == "" || phoneNumber == "") {
      return toast.error("All fields are required");
    }

    const orderDate = new Date();
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(orderDate.getDate() + 7); // +7 days

    const addressInfo = {
      name,
      address,
      pincode,
      phoneNumber,
      date: orderDate.toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    if (method === "cod") {
      // Place order directly for Cash on Delivery
      const orderInfo = {
        cartItems,
        addressInfo,
        date: orderDate.toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
        deliveryDate: deliveryDate.toISOString(), // fixed delivery date
        email: JSON.parse(localStorage.getItem("user")).user.email,
        userid: JSON.parse(localStorage.getItem("user")).user.uid,
        status: "Ordered",
        paymentId: "COD",
        grandTotal: grandTotal,
        paymentMethod: "Cash on Delivery",

      };

      //Reload  page for update order------------
      setTimeout(() => {
        window.location.href = "/cart";
        //after completing order clear cart storage--------------
        localStorage.removeItem("cart");
      }, 1200);

      try {
        const orderRef = collection(firebaseDB, "orders");
        await addDoc(orderRef, orderInfo);
        toast.success(
          `Order placed! Expected delivery on ${deliveryDate.toDateString()}`
        );
        // Optionally clear cart or redirect
      } catch (error) {
        console.log(error);
        toast.error("Failed to place order.");
      }
      return;
    }

    // Online Payment (Razorpay)
    var options = {
      key: "rzp_test_rmJprKHkqwT85l",
      key_secret: "7vqkNgOjwnfx8a13WysHFoiV",
      amount: parseInt(grandTotal * 100),
      currency: "INR",
      image: "https://i.ibb.co/DHNXwRCH/logo.jpg",
      order_receipt: "order_rcptid_" + name,
      name: "Noor By Shayan",
      description: "Secured Payment Dude ",
      handler: function (response) {
        toast.success("Payment Successful");
        //Reload  page for update order----------------------
        setTimeout(() => {
          window.location.href = "/cart";
        }, 1200);
        //after completing order clear cart storage--------------------------
        localStorage.removeItem("cart");
        const paymentId = response.razorpay_payment_id;

        // store order information into firebase
        const orderInfo = {
          cartItems,
          addressInfo,
          date: orderDate.toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
          deliveryDate: deliveryDate.toISOString(), // fixed delivery date
          email: JSON.parse(localStorage.getItem("user")).user.email,
          userid: JSON.parse(localStorage.getItem("user")).user.uid,
          paymentId,
          grandTotal: grandTotal,
          paymentMethod: "Online Payment",
        };

        try {
          const orderRef = collection(firebaseDB, "orders");
          addDoc(orderRef, orderInfo);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#FF9900",
        hide_topbar: false,
      },
    };

    var pay = new window.Razorpay(options);
    pay.open();
  };

  // Go to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div
      className="min-h-screen bg-gray-100 pt-5"
      style={{
        backgroundColor: mode === "dark" ? "#1f2937" : "",
        color: mode === "dark" ? "white" : "",
      }}
    >
      <h1 className="text-center text-3xl font-extrabold mb-8">My Cart</h1>

      <div className="mx-auto max-w-6xl flex flex-col md:flex-row gap-6 px-4 xl:px-0">
        {/* LEFT SIDE - CART ITEMS */}
        <div className="md:w-2/3  max-h-[80vh] overflow-y-auto scrollbar-hide  pr-2">
          {/* Showing Delivary Address */}
          <div className="w-full bg-gray-200 px-5 py-2 mb-3 shadow-sm ">
            <p>
              <span className="text-[13px]">Deliver to:</span>
              <span className="font-semibold text-[15px] text-gray-900">
                {" "}
                {userData?.name},
              </span>
              <span className="text-[14px] font-semibold text-gray-900">
                {" "}
                {userData?.pincode}
              </span>
            </p>
            <p className="text-[11px] font-semibold text-gray-700">
              {" "}
              {userData?.address}
            </p>
          </div>

          {/* Showing added items */}
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => {
              const {
                title,
                price,
                images,
                description,
                originalPrice,
                type,
                quantity,
                quan,
                id,
                category,
              } = item;
              return (
                <div
                  key={index}
                  className={`flex bg-white shadow-md overflow-hidden border-b border-gray-400 hover:shadow-lg transition duration-200 ${
                    mode === "dark" ? "bg-[#2c2f36] border-gray-700" : ""
                  }`}
                >
                  <img
                    src={images[0]}
                    onClick={() =>
                      (window.location.href = `/productinfo/${id}`)
                    }
                    alt="product"
                    className="w-32 h-32 sm:h-40 object-cover cursor-pointer"
                  />
                  <div className="flex flex-col justify-between p-4 flex-1">
                    <div>
                      <h2 className="text-[16px] sm:text-lg font-semibold">
                        {title.slice(0, 40)}...
                      </h2>
                      <p className="text-[14px] sm:text-sm text-gray-500 mb-1">
                        {type} {quantity} / {category}
                      </p>
                      <p className="text-[13px] sm:text-sm text-gray-600">
                        {description.slice(0, 60)}...
                      </p>
                      <p className="text-[13px] sm:text-sm text-gray-600">
                        {Number(quan) > 1
                          ? `${Number(quan)} items`
                          : `${Number(quan)} item`}{" "}
                        / <span>Total Price: </span> ₹ {" "}
                        {Number(item.quan) * Number(item.price)}
                      </p>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          className="px-2 py-1 border-2 border-[#376a55]  rounded cursor-pointer"
                          onClick={() =>
                            item.quan > 1
                              ? dispatch(decreaseQuantity(item.id))
                              : deleteCart(item)
                          }
                        >
                          <FaMinus size={12} className="text-[#376a55]" />
                        </button>
                        <span className="px-3">{item.quan || 1}</span>
                        <button
                          className="px-2 py-1 border-2 border-[#376a55] rounded cursor-pointer"
                          onClick={() => dispatch(increaseQuantity(item.id))}
                        >
                          <FaPlus size={12} className="text-[#376a55]" />
                        </button>
                      </div>
                      <RiDeleteBin6Fill
                        onClick={() => deleteCart(item)}
                        className="text-xl text-gray-600 hover:text-red-500 cursor-pointer"
                        title="Remove from cart"
                      />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <NoOrderFound />
          )}
        </div>

        {/* RIGHT SIDE - ORDER SUMMARY */}
        <div
          className={`md:w-1/3 p-6 rounded-xl shadow-lg border bg-white h-fit ${
            mode === "dark" ? "bg-[#23272f] border-gray-700" : ""
          }`}
        >
          <h3 className="text-xl font-bold mb-4 border-b pb-2">
            Price Summary
          </h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="flex items-center font-medium text-semibold">
                <span className="flex items-center mr-0.5 text-gray-700">
                  {" "}
                  ₹{" "}
                </span>{" "}
                {totalAmount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>
                {" "}
                {totalAmount > 60 ? "Shipping Free" : "Shipping Charged"}{" "}
              </span>
              <span className="flex items-center font-medium text-semibold">
                <span className="flex items-center mr-0.5 text-gray-900">
                  {" "}
                  ₹{" "}
                </span>{" "}
                {totalAmount > 60 ? "0.00" : shipping.toFixed(2)}
              </span>
            </div>
            <hr />
            <div className="flex justify-between text-base font-bold">
              <span>Grand Total</span>
              <span className="flex items-center text-gray-700">
                <span className="text-gray-800 mr-1">₹</span>
                {grandTotal}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <Modal
              name={name}
              address={address}
              pincode={pincode}
              phoneNumber={phoneNumber}
              setName={setName}
              setAddress={setAddress}
              setPincode={setPincode}
              setPhoneNumber={setPhoneNumber}
              buyNow={buyNow}
              grandTotal={grandTotal}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
