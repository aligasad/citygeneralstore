import React, { useEffect } from "react";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";
import { useData } from "../../context/data/MyState";
import NoOrderFound from "../../components/noorder/NoOrderFound";
import { ArrowBigDown } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { firebaseDB } from "../../firebase/FirebaseConfig"; // apne firebaseConfig ka import karein
import { toast } from "react-toastify";

function Order() {
  const userid = JSON.parse(localStorage.getItem("user")).user.uid;
  const context = useData();
  const { mode, loading, order } = context;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // cancelProduct function
  const cancelProduct = async (orderId, itemId) => {
    try {
      if (!orderId) {
        console.error("Order ID missing");
        toast.error("Order ID missing");
        return;
      }

      const orderRef = doc(firebaseDB, "orders", orderId);
      const selectedOrder = order.find((o) => o.id === orderId);

      if (!selectedOrder) {
        console.error("Order not found");
        return;
      }

      // Update the cancelled item's status------------!
      const updatedCart = selectedOrder.cartItems.map((item) =>
        item.id === itemId ? { ...item, status: "Cancelled" } : item
      );

      // ✅ Recalculate subtotal (ignoring cancelled items)
      const subtotal = updatedCart.reduce(
        (acc, item) =>
          item.status === "Cancelled" ? acc : acc + item.price * item.quan,
        0
      );

      // ✅ Add shipping if subtotal < 60
      const grandTotal =
        subtotal < 60 ? (subtotal === 0 ? subtotal : subtotal + 5) : subtotal;

      // ✅ Update Firestore
      await updateDoc(orderRef, {
        cartItems: updatedCart,
        grandTotal: parseFloat(grandTotal.toFixed(2)), // store as number
      });

      await updateDoc(orderRef, {
        cartItems: updatedCart,
      });

      toast.success("Product Cancelled Successfully ✅");
      // Instent updated status ko UI pe dikhane ke liye kar rahe hai halake ye behter code nahi hai--------------
      window.location.reload();
    } catch (error) {
      console.error("Error cancelling product:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div
      className={`min-h-screen py-8 px-2 ${
        mode === "dark"
          ? "bg-[#181a20] text-white"
          : "bg-gradient-to-br from-green-50 to-blue-100 text-gray-900"
      }`}
    >
      <h1 className="mb-8 text-center text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-[#449474] drop-shadow-lg">
        My Orders
      </h1>

      <div className="mx-auto max-w-6xl">
        {loading && <Loader />}

        {order.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {order
              .filter((obj) => obj.userid === userid)
              .map((order, idx) => (
                <div
                  key={idx}
                  className={`rounded-2xl shadow-xl border overflow-hidden ${
                    mode === "dark"
                      ? "bg-[#23272f] border-gray-700"
                      : "bg-white border-gray-200"
                  } transition hover:scale-[1.02]`}
                >
                  {/* Header */}
                  <div
                    className={`p-4 flex items-center justify-between bg-green-50 ${
                      mode === "dark" ? "bg-[#1d2027]" : "bg-gray-50"
                    }`}
                  >
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full  ${
                        order.paymentId === "COD"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {order.paymentMethod}
                    </span>
                    <span className="text-xs text-gray-500">{order.date}</span>
                  </div>

                  {/* Product List */}
                  <div className="relative h-40 bg-red-50 overflow-y-auto scrollbar-hide divide-y">
                    {order.cartItems.map((item, i) => (
                      <div
                        key={i}
                        className="group flex justify-between gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-600 transition"
                      >
                        <div
                          onClick={() => {
                            if (item.status !== "Cancelled") {
                              window.location.href = `productInfo/${item.id}`;
                            }
                          }}
                          className="flex gap-4 cursor-pointer"
                        >
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-16 h-16 object-cover rounded-lg shadow"
                          />
                          <div className="flex-1">
                            <h2 className="text-sm group-hover:text-rose-400 font-semibold line-clamp-1">
                              {item.title}
                            </h2>
                            <p className="text-[11px] group-hover:text-rose-200 text-gray-500">
                              {item.category}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              {item.price && (
                                <span className="text-xs font-semibold group-hover:text-gray-200 text-gray-700">
                                  ${item.price}
                                </span>
                              )}
                              <span className="text-[13px] font-bold group-hover:text-red-500 text-rose-800">
                                x {item.quan} =
                              </span>

                              <span className="text-sm font-bold text-green-600">
                                ${item.price * item.quan}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Cancel Button */}
                        {item.status === "Cancelled" ? (
                          <span className="text-xs font-bold text-red-600 self-center">
                            Cancelled
                          </span>
                        ) : (
                          <button
                            onClick={() => cancelProduct(order.id, item.id)}
                            className="cursor-pointer text-xs px-2 py-1 bg-red-400 hover:bg-red-600 text-white rounded-lg  self-center"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Total Section with Shipping ---------------------------  ------------  ------------ */}
                  <div className="px-4 py-2 border-t bg-green-50 dark:border-gray-700 flex flex-col gap-2 rounded-b-2xl">
                    {(() => {
                      // Calculate subtotal once
                      const subtotal = order.cartItems.reduce(
                        (acc, item) =>
                          item.status === "Cancelled"
                            ? acc
                            : acc + item.price * item.quan,
                        0
                      );

                      // Determine shipping fee
                      const shipping =
                        subtotal === 0 ? 0 : subtotal < 60 ? 5 : 0;

                      // Calculate grand total
                      const grandTotal = subtotal + shipping;

                      return (
                        <>
                          <div className=" sm:flex sm:gap-3">
                            <p>
                              <span className="font-medium text-sm text-gray-700 ">
                                Subtotal :
                              </span>
                              <span className="font-semibold text-sm text-green-700 dark:text-green-400">
                                 {` $${subtotal.toFixed(2)}`}
                              </span>
                            </p>

                            <p>
                              <span className="font-medium text-sm text-gray-700 ">
                                Shipping :
                              </span>
                              <span className="font-semibold text-green-700 dark:text-green-400">
                                { shipping === 0
                                  ? " Free"
                                  : ` $${shipping.toFixed(2)}`}
                              </span>
                            </p>
                          </div>

                          <p className="flex justify-between border-t border-gray-300 pt-2">
                            <span className="text-md font-semibold text-gray-800 ">
                              Total Amount:
                            </span>
                            <span className="text-lg font-bold text-green-600">
                              ${grandTotal.toFixed(2)}
                            </span>
                          </p>
                        </>
                      );
                    })()}
                  </div>

                  {/* Shipping Info */}
                  <div className="p-4 border-t bg-red-50 text-xs text-gray-500 dark:text-gray-400 space-y-1">
                    <p>
                      <span className="font-semibold text-gray-700 dark:text-gray-500 line-clamp-1">
                        Shipping to:
                      </span>{" "}
                      {order.addressInfo?.name}, {order.addressInfo?.address},{" "}
                      {order.addressInfo?.pincode}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-700 dark:text-gray-300">
                        Phone:
                      </span>{" "}
                      {order.addressInfo?.phoneNumber}
                    </p>
                    <p className="flex items-center gap-1">
                      Delivary Status:{" "}
                      <div>
                        {order.cartItems.every(
                          (item) => item.status === "Cancelled"
                        ) ? (
                          <span className="font-bold text-rose-700">
                            Cancelled
                          </span>
                        ) : order.deliveryDate ? (
                          (() => {
                            const today = new Date();
                            const delivery = new Date(order.deliveryDate);

                            // Din ke level par compare karne ke liye time reset
                            today.setHours(0, 0, 0, 0);
                            delivery.setHours(0, 0, 0, 0);

                            const diffInDays =
                              (delivery - today) / (1000 * 60 * 60 * 24);

                            // Agar delivery ho chuki hai aur status "success" hai
                            if (order.status?.toLowerCase() === "success") {
                              return (
                                <span className="font-semibold text-green-600 text-[13px]">
                                  Delivered
                                </span>
                              );
                            }

                            // Agar delivery date guzar gayi aur success nahi hua
                            if (
                              delivery < today &&
                              order.status?.toLowerCase() !== "success"
                            ) {
                              return (
                                <span className="font-bold text-rose-700">
                                  Cancelled
                                </span>
                              );
                            }

                            // Agar delivery date future me hai aur abhi tak success nahi
                            if (
                              delivery > today &&
                              order.status?.toLowerCase() !== "success"
                            ) {
                              if (diffInDays === 0) {
                                return "Today";
                              } else if (diffInDays === 1) {
                                return "Tomorrow";
                              } else {
                                return delivery.toLocaleDateString("en-US", {
                                  month: "long",
                                  day: "numeric",
                                });
                              }
                            }

                            return (
                              <span className="font-semibold">On the Way</span>
                            );
                          })()
                        ) : (
                          "N/A"
                        )}
                      </div>
                    </p>
                    ;
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <NoOrderFound />
        )}
      </div>
    </div>
  );
}

export default Order;
