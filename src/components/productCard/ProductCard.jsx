import React, { useEffect, useState } from "react";
import { useData } from "../../context/data/MyState";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/CartSlice";
import { toast } from "react-toastify";
import { Timestamp } from "firebase/firestore";
import { motion } from "framer-motion";

function ProductCard() {
  const context = useData();
  const [isWished, setIsWished] = useState(false);

  const {
    mode,
    product,
    searchkey,
    setSearchkey,
    filterType,
    setFilterType,
    filterPrice,
    setFilterPrice,
    calcOffer,
  } = context;
  // console.log("ITEMS: ",product);
  // ====================={R E D U X - P A R T}===============================
  const dispatch = useDispatch(); //Returns the dispatch function from the Redux store
  const cartItems = useSelector((state) => state.cart);
  // =============================================================
  console.log("cartItems", cartItems);
  // console.log("SELECTED", isWished);

  const user = JSON.parse(localStorage.getItem("user"));
  // add to cart and remove from cart function-------------------------------------------

  const toggleCart = (product) => {
    if (!user) {
      toast.warning("Please login first!");
      return;
    }

    const isInCart = cartItems.some((item) => item.id === product.id);

    if (isInCart) {
      dispatch(deleteFromCart(product));
      toast.info("Item removed from cart");
    } else {
      dispatch(addToCart(product));
      toast.success("Item added to cart");
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <section className="text-gray-600 bg-[#dcf8ef] body-font">
      <div className="container px-5 py-8 md:py-16 mx-auto">
        <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
          <h1
            className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
            style={{ color: mode === "dark" ? "white" : "" }}
          >
            Our Latest Products
          </h1>
          <div className="h-1 w-25 bg-green-700 rounded"></div>
        </div>

        <div className="flex flex-wrap -m-4">
          {product
            .filter(
              (item) =>
                item.title
                  .toLowerCase()
                  .includes(
                    searchkey.toLowerCase().trim().replace(/\s+/g, " "),
                  ) ||
                item.type
                  .toLowerCase()
                  .includes(
                    searchkey.toLowerCase().trim().replace(/\s+/g, " "),
                  ),
            )
            .filter((item) =>
              item.category
                .replace(/\s+/g, "")
                .toLowerCase()
                .includes(filterType),
            )
            .slice(0, 5)
            .filter((obj) => obj.price.trim().includes(filterPrice))
            .map((item, index) => {
              const {
                title,
                price,
                images,
                id,
                category,
                type,
                isNew,
                stock,
                quantity,
                originalPrice,
                description,
                date,
              } = item;
              return (
                <div
                  key={index}
                  className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2"
                >
                  <motion.div
                    key={index}
                    className=""
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div
                      className="h-full rounded-lg shadow-md bg-[#A7EAD5] hover:shadow-lg transition-shadow hover:shadow-gray-500 duration-300"
                      style={{
                        backgroundColor:
                          mode === "dark" ? "#232F3E" : "#A7EAD5",
                        color: mode === "dark" ? "#FFFFFF" : "#000000",
                      }}
                    >
                      <div className="flex justify-center items-center p-4 bg-white rounded-t-lg border-2 border-b-0 border-[#003d29] relative">
                        <p className=" absolute bottom-0 left-0 bg-green-700 px-2 rounded-tr-lg text-[10px] sm:text-[13px] text-white font-semibold z-10 ">
                          On Sale
                        </p>
                        {isNew ? (
                          <p className="absolute bottom-0 right-0 px-3 text-[13px] text-white font-semibold z-10 bg-black rounded-tl-lg">
                            {" "}
                            New{" "}
                          </p>
                        ) : (
                          ""
                        )}
                        <img
                          onClick={() =>
                            (window.location.href = `/productinfo/${id}`)
                          }
                          className="h-36 sm:h-44 object-contain transition-transform rounded-md duration-300 hover:scale-110 cursor-pointer"
                          src={images[0]}
                          alt={title}
                        />
                      </div>
                      <div className="px-2 md:px-4 pb-4 border-t bg-[#003d29]  rounded-b-lg  border-gray-300">
                        <p className="text-xs text-white mt-2">
                          <span className=" font-semibold">{type}</span> /{" "}
                          {category}
                        </p>
                        <h2 className="text-sm font-semibold truncate text-gray-300">
                          {title}
                        </h2>
                        <h2 className="text-[12px] font-semibold truncate text-gray-300">
                          <span>Quantity: </span>
                          {quantity}
                        </h2>
                        <hr className="text-white mt-[3px]" />
                        <div className="flex items-baseline gap-1">
                          <p className="text-[14px] md:text-base font-bold text-red-600 mt-1">
                            ₹{price}
                          </p>
                          <p className="text-[12px] md:text-sm font-semibold text-gray-100 line-through">
                            ₹{originalPrice}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-2 w-[70%] sm:w-[55%]">
                          <button
                            onClick={() => toggleCart(item)}
                            className={`px-3 py-[6px] sm:py-2 mr-2 text-[12px] md:text-sm font-semibold rounded-lg transition duration-800 hover:scale-105 cursor-pointer ${
                              cartItems.some((p) => p.id === item.id)
                                ? "bg-red-700 text-white hover:bg-black"
                                : "bg-[#439373] text-black hover:bg-black hover:text-white"
                            }`}
                          >
                            {cartItems.some((p) => p.id === item.id)
                              ? "Remove"
                              : "Add to Cart"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}

export default ProductCard;
