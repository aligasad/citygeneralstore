import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useData } from "../../../context/data/MyState.jsx";
import { addToCart, deleteFromCart } from "../../../redux/CartSlice.jsx";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa6";
import { motion } from "framer-motion";

function LipGloss() {
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const context = useData();
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

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  console.log(cartItems);

  // add to cart if item is not already present   -- -- --- ---- ------ -----
  const user = JSON.parse(localStorage.getItem("user"));
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
      dispatch(addToCart({ ...product, quan: 1 }));
      toast.success("Item added to cart");
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
  // got to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        onAnimationComplete={() => setIsFirstVisit(false)} // Remove animation after it's done
      >
        <section className="text-gray-600 body-font bg-[#caf5e7a7]">
          <div className="container px-5 py-8 md:py-16 mx-auto">
            <div class="lg:w-1/2 w-full mb-6 lg:mb-10">
              <h1
                class="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900"
                style={{ color: mode === "dark" ? "white" : "" }}
              >
                Masale & Spices
              </h1>
              <div class="h-1 w-25 bg-green-700 rounded"></div>
            </div>

            <div className="flex flex-wrap -m-4">
              {product
                .filter((obj) =>
                  obj.category
                    .toLowerCase()
                    .replace(/\s+/g, "")
                    .includes("masale")
                )
                .filter(
                  (obj) =>
                    obj.title.toLowerCase().includes(searchkey) ||
                    obj.type.toLowerCase().includes(searchkey)
                )
                .filter((item) =>
                  item.category
                    .replace(/\s+/g, "")
                    .toLowerCase()
                    .includes(filterType)
                )
                .map((item, index) => {
                  const {
                    title,
                    price,
                    originalPrice,
                    category,
                    type,
                    stock,
                    isNew,
                    quantity,
                    images,
                    id,
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
                            {stock > 0 ? (
                              <p className=" absolute bottom-0 left-0 bg-green-700 px-2 rounded-tr-lg text-[10px] sm:text-[13px] text-white font-semibold z-10 ">
                                On Sale
                              </p>
                            ) : (
                              <p className=" absolute bottom-0 left-0 bg-[#b35d52] px-2 rounded-tr-lg text-[10px] sm:text-[13px] text-white font-semibold z-10 ">
                                Sold Out
                              </p>
                            )}
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
                                ${price}
                              </p>
                              <p className="text-[12px] md:text-[13px] sm:ml-1 font-semibold text-gray-100 line-through">
                                ${originalPrice}
                              </p>
                            </div>

                            <div className="flex items-center justify-between mt-2 w-[70%] sm:w-[55%]">
                              {stock > 0 ? (
                                <button
                                  onClick={() => toggleCart(item)}
                                  className={`px-3 h-8 sm:h-9 sm:w-27 sm:py-2 mr-2 text-[12px] md:text-sm font-semibold rounded-sm transition duration-200 hover:shadow-sm hover:shadow-gray-900 cursor-pointer ${
                                    cartItems.some((p) => p.id === item.id)
                                      ? "bg-red-700 text-white"
                                      : "bg-[#439373] hover:text-white"
                                  }`}
                                >
                                  {cartItems.some((p) => p.id === item.id)
                                    ? "Remove"
                                    : "Add to Cart"}
                                </button>
                              ) : (
                                <button
                                  disabled
                                  className="px-3 h-8 sm:h-9 sm:py-2 mr-2 text-[12px] md:text-sm font-semibold rounded-sm text-white bg-[#b35d52] cursor-not-allowed"
                                >
                                  Out of Stock
                                </button>
                              )}
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
      </motion.div>
    </div>
  );
}

export default LipGloss;
