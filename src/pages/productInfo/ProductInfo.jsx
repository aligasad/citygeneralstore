import React, { useEffect, useState } from "react";
import { useData } from "../../context/data/MyState";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { firebaseDB } from "../../firebase/FirebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/CartSlice";
import { toast } from "react-toastify";
import {
  FaArrowCircleDown,
  FaArrowCircleUp,
  FaCheckCircle,
} from "react-icons/fa";
import ReviewSection from "../../components/reviews/reviews";
import { collection, query, where, getDocs } from "firebase/firestore";

function ProductInfo() {
  const context = useData();
  const [isWished, setIsWished] = useState(false);
  const { loading, setLoading, calcOffer, product } = context;

  const [products, setProducts] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const params = useParams();
  // console.log(products.title)

  const getProductData = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(firebaseDB, "products", params.id));
      // console.log(productTemp)
      setProducts(productTemp.data());
      // console.log(productTemp.data())
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {
    const fetchSimilarProducts = async () => {
      if (!products.type) return;
      try {
        const q = query(
          collection(firebaseDB, "products"),
          where("type", "==", products.type),
        );
        const querySnapshot = await getDocs(q);
        const items = [];
        querySnapshot.forEach((doc) => {
          // Exclude current product
          if (doc.id !== params.id) {
            items.push({ id: doc.id, ...doc.data() });
          }
        });
        setSimilarProducts(items);
      } catch (error) {
        console.log(error);
      }
    };
    if (products.type) fetchSimilarProducts();
  }, [products.type, params.id]);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  // console.log(cartItems);

  // add to cart if item is not already present
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
      dispatch(addToCart(product));
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

  function calculateDiscount(original, selling) {
    if (!original || !selling || Number(original) === 0) return 0;
    const discount =
      ((Number(original) - Number(selling)) / Number(original)) * 100;

    return discount.toFixed(2);
  }

  // --------------FOR ACCORDION REVIEW SECTION------------------
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <section className="text-gray-700 body-font overflow-hidden bg-gradient-to-br from-green-50 to-blue-100 min-h-screen">
      <div className="container ">
        {products && (
          <div className="max-w-max mx-auto bg-white shadow-lg py-4 px-8 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Images Section */}
              <div>
                {/* Big Image */}
                <div className="w-full bg-gray-100 rounded-2xl flex items-center justify-center mb-6 border overflow-hidden shadow-inner">
                  <img
                    alt="ecommerce"
                    className="w-full max-h-[55vh] object-contain rounded-xl transition-all duration-300"
                    src={selectedImage || products.images[0]}
                  />
                </div>
                {/* Thumbnails */}
                <div className="flex gap-3 justify-center">
                  {[
                    products.images[0],
                    products.images[1],
                    products.images[2],
                    products.images[3],
                  ]
                    .filter(Boolean)
                    .map((url, idx) => (
                      <img
                        key={idx}
                        src={url}
                        alt={`thumb-${idx}`}
                        className={`w-16 h-16 object-cover rounded-xl cursor-pointer border-2 transition-all duration-200 transform hover:scale-105 ${
                          (selectedImage || products.imageUrl) === url
                            ? "border-[#449474] shadow-md"
                            : "border-gray-200 opacity-70 hover:opacity-100"
                        }`}
                        onClick={() => setSelectedImage(url)}
                      />
                    ))}
                </div>

                <div className="hidden sm:block mt-8">
                  <ReviewSection productId={params} />
                </div>
              </div>
              {/* Product Info Section */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-xs md:text-sm title-font bg-gradient-to-r from-gray-800 to-amber-500 bg-clip-text text-transparent font-bold tracking-widest md:mr-3">
                      {products.brand.toUpperCase() || "THE ZAPHIRA"}
                    </h2>
                    {products.isNew && (
                      <span className="bg-green-200 text-green-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                        New
                      </span>
                    )}
                    {
                      <span className="bg-yellow-200 text-yellow-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                        {Number(products.stock) !== 0 ? "On Sale" : "Sold Out"}
                      </span>
                    }
                  </div>
                  <h1 className="text-gray-900 text-2xl md:text-3xl title-font font-bold mb-2">
                    {products.title}
                  </h1>
                  <h2 className="text-xs md:text-sm title-font text-yellow-600 font-semibold tracking-widest mb-2">
                    {products.category?.toUpperCase()}
                  </h2>
                  <div className="flex flex-wrap items-center mb-4"></div>

                  {/* --- Details Card --- */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="font-bold text-green-700">
                        Quantity:
                      </span>{" "}
                      <span className="text-rose-700 font-bold">
                        {products.quantity || "N/A"}
                      </span>
                    </div>
                    <div>
                      <span className="font-bold text-green-700">Type:</span>{" "}
                      <span className="text-gray-700 font-semibold text-[13px]">
                        {products.type ? products.type.toUpperCase() : "N/A"}
                      </span>
                    </div>
                    <div>
                      <span className="font-bold text-green-700">
                        Self Life:
                      </span>{" "}
                      <span className="text-gray-700 font-semibold text-[13px]">
                        {products.selfLife
                          ? products.selfLife.toUpperCase()
                          : "N/A"}
                      </span>
                    </div>
                    <div className="sm:col-span-2 mt-0 sm:mt-3">
                      <span className="font-bold text-green-700">Tags:</span>{" "}
                      {products.tags ? (
                        products.tags.split("|").map((tag, i) => (
                          <span
                            key={i}
                            className="inline-block bg-amber-100 text-green-800 text-[12px] font-semibold rounded-full px-2 py-0.5 text-xs mr-2 mb-1"
                          >
                            {tag.trim()}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500">No tags</span>
                      )}
                    </div>
                  </div>

                  {/* --- Description, Ingredients & Benefits --- */}
                  <div className="space-y-4">
                    {/* Description */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleSection("description")}
                        className=" cursor-pointer w-full text-left px-5 py-2 bg-gray-100 font-semibold text-gray-700 flex justify-between items-center transition duration-200 hover:bg-gray-200"
                      >
                        <span>Description</span>
                        <FaArrowCircleDown
                          className={`transform transition-transform duration-300 cursor-pointer ${
                            openSection === "description"
                              ? "rotate-180 text-[#439373]"
                              : ""
                          }`}
                        />
                      </button>
                      {openSection === "description" && (
                        <div className="p-5 text-sm md:text-base text-gray-600 border-t border-gray-200">
                          {products.description ? (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: products.description,
                              }}
                            />
                          ) : (
                            <span className="text-gray-400">N/A</span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Ingredients */}
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                      <button
                        className="cursor-pointer w-full text-left px-5 py-2 bg-gray-100 font-semibold text-gray-700 flex justify-between items-center transition duration-200 hover:bg-gray-200"
                        onClick={() => toggleSection("ingredients")}
                      >
                        <span>Ingredients</span>
                        <FaArrowCircleDown
                          className={`transform transition-transform duration-300 cursor-pointer  ${
                            openSection === "ingredients"
                              ? "rotate-180 text-[#439373]"
                              : ""
                          }`}
                        />
                      </button>
                      {openSection === "ingredients" && (
                        <div className="p-5 text-sm md:text-base text-gray-600 border-t border-gray-200">
                          {products.ingredients ? (
                            <ul className="list-disc pl-5">
                              {products.ingredients
                                .split("|")
                                .map((ingredient, index) => (
                                  <li key={index}>{ingredient.trim()}</li>
                                ))}
                            </ul>
                          ) : (
                            <span className="text-gray-400">N/A</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-2 mb-2 mt-4">
                      <p className="text-2xl font-bold text-red-600 mt-1">
                        ${products.price}
                      </p>
                      {products.originalPrice && (
                        <p className="text-lg md:text-xl font-semibold text-gray-400 line-through">
                          ${products.originalPrice}
                        </p>
                      )}
                      {products.originalPrice && products.price && (
                        <span className="ml-3 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-bold">
                          {calculateDiscount(
                            products.originalPrice,
                            products.price,
                          )}
                          % OFF
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => toggleCart(products)}
                      className={`px-3 w-full sm:py-2 h-10 sm:h-12 mr-2 text-[14px] text-white sm:text-base font-semibold rounded-sm transition text-wh duration-200 hover:shadow-md hover:shadow-gray-800 cursor-pointer ${
                        cartItems.some((p) => p.id === products.id)
                          ? "bg-red-700 text-white"
                          : "bg-[#439373]  hover:text-white"
                      }`}
                    >
                      {cartItems.some((p) => p.id === products.id)
                        ? "Remove"
                        : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>

              <div className=" sm:hidden ">
                <ReviewSection productId={params} />
              </div>
            </div>

            {/* Similar Products Carousel------------------------------------------------------------- */}
            {similarProducts.length > 0 && (
              <div className="mt-10">
                <h2 className="text-xl font-bold mb-4 text-green-800">
                  Similar Products
                </h2>
                <div className="flex overflow-x-auto gap-6 pb-4">
                  {similarProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="w-[200px] bg-white rounded-sm shadow p-3 my-1 flex-shrink-0 hover:shadow-md hover:shadow-gray-400 transition-all duration-200 "
                    >
                      <img
                        src={prod.imageUrl}
                        alt={prod.title}
                        className="w-32 h-32 object-contain rounded-lg mb-2 m-auto"
                      />
                      <div className="font-semibold text-gray-800 line-clamp-1">
                        {prod.title}
                      </div>
                      <div>
                        <span className="text-green-700 font-bold">
                          ${prod.price}
                        </span>
                        <span className="text-[14px] text-rose-600 font-semibold line-through decoration-1 ml-2">
                          ${prod.originalPrice}
                        </span>
                      </div>
                      <button
                        className="mt-2 px-3 py-1 bg-[#439373] text-white rounded hover:bg-green-800 text-xs cursor-pointer transition-all duration-200"
                        onClick={() =>
                          (window.location.href = `/productinfo/${prod.id}`)
                        }
                      >
                        View
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductInfo;
