import { useData } from "../../context/data/MyState";
import { BsFillCloudSunFill } from "react-icons/bs";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IoLogOut } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { FaAngleDown, FaUserAlt } from "react-icons/fa";
import {
  Home,
  User,
  Layers,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";
import logo from "../../assets/logo.png";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { auth, firebaseDB } from "../../firebase/FirebaseConfig";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

function Navbar() {
  const navigate = useNavigate();
  const profile = JSON.parse(localStorage.getItem('profile'));
  const context = useData();
  const {
    mode,
    toggleMode,
    product,
    searchkey,
    setSearchkey,
    filterType,
    setFilterType,
    filterPrice,
    setFilterPrice,
    address,
    resetFilter,
    pageType,
    setPageType,
  } = context;

  console.log("PAGE TYPE", pageType);
  const [location, setLocation] = useState("");
  useEffect(() => {
    const fullAddress = address || "";
    const shortAddress = fullAddress.split(" ").slice(0, 3).join(" ");
    setLocation(shortAddress);
  }, [address]); // Only re-run when address changes

  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // For Select Options in header-=============================================
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const productRef = useRef(null);
  const userRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        productRef.current &&
        !productRef.current.contains(event.target) &&
        event.target.getAttribute("data-dropdown") !== "product"
      ) {
        setIsProductDropdownOpen(false);
      }
      if (
        userRef.current &&
        !userRef.current.contains(event.target) &&
        event.target.getAttribute("data-dropdown") !== "user"
      ) {
        setIsUserDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (path) => {
    setIsProductDropdownOpen(false);
    setIsUserDropdownOpen(false);
    navigate(path);
  };

  // For dark and light mode-----------------------
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // FOR LOGO UT-----------------
  function handleLogout() {
    auth.signOut();
    setIsDropdownOpen((prev) => !prev);
    localStorage.clear("user");
    navigate("/");
    // localStorage.clear("cart");
    toast.success("Logout Successfully!");
  }

  // For loggedIn user information--------------
  const user = JSON.parse(localStorage.getItem("user"));

  // cartItems data---------------------
  const cartItems = useSelector((state) => state.cart);
  const wishListitems = useSelector((state) => state.wishlist);

  // Finding all types-------------------------------------------
  const [types, setTypes] = useState([]);
  function getTypes() {
    const typo = [...new Set(product.map((item) => item.type))];
    // const typo1 = [...new Set(product.map((item) => item.type))];
    setTypes(typo);
  }
  // got to top
  useEffect(() => {
    window.scrollTo(0, 0);
    // window.scrollTo(0, window.innerHeight * 0.4);
    getTypes();
  }, [searchkey, filterType, product]);

  function onTop() {
    window.scrollTo(0, 0);
  }

  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [searchBarOpen, setSearchBarOpen] = useState(false); // <-- Add this line


  return (
    <div className="bg-[#dfe3d6] sticky top-0 z-50 shadow-md">
      {/* Mobile View */}
      <div className="md:hidden flex justify-between items-center px-4 py-3">
        <Link to="/" className="text-2xl font-bold text-green-700">
          <div className="">
            <img
              onClick={onTop}
              src={logo}
              alt="Logo"
              className="w-10 h-auto rounded"
            />
          </div>
        </Link>

        {/* Right side icons */}
        <div className="flex items-center gap-5">
          {/* Mobile Search Icon & Input */}
          {!searchBarOpen ? (
            <button
              onClick={() => setSearchBarOpen(true)}
              className="text-xl text-gray-700"
            >
              <RiSearchLine />
            </button>
          ) : (
            <input
              type="text"
              autoFocus
              placeholder="Search..."
              value={searchkey}
              onChange={(e) => setSearchkey(e.target.value)}
              onBlur={() => setSearchBarOpen(false)}
              className="w-44 p-2 text-sm border border-gray-300 rounded-md outline-none"
              style={{ maxWidth: "220px" }}
            />
          )}

          {/* Cart button */}
          <Link to="/cart">
            <div className="relative">
              <ShoppingCart className="h-5 w-5 font-bold text-gray-700 " />
              <span className="bg-green-400 text-black text-[12px] rounded-full px-[5px] absolute -top-2 -right-3">
                {(cartItems || []).length}
              </span>
            </div>
          </Link>

          {/* Menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl text-green-700"
          >
            <Menu />
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {menuOpen && (
        <>
          {/* Half-screen overlay */}
          <div
            className="fixed inset-0 z-40 pointer-events-none"
            aria-hidden="true"
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent w-1/2 h-full pointer-events-auto"
              onClick={() => setMenuOpen(false)}
            />
          </div>
          {/* Slide-in menu from left, half screen */}
          <div
            className="fixed top-0 left-0 h-full w-1/2 sm:w-3/5 bg-[#f5f5eb] shadow-2xl z-50 rounded-r-2xl border-r border-green-200 transform transition-transform duration-300 ease-in-out"
            style={{
              transform: menuOpen ? "translateX(0)" : "translateX(-100%)",
            }}
          >
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h2 className="text-lg font-semibold text-green-700">Menu</h2>
              <X
                onClick={() => setMenuOpen(false)}
                className="cursor-pointer text-2xl text-green-700"
              />
            </div>
            <ul className="space-y-4 text-gray-800 px-6 py-6 font-medium">
              <li>
                <div
                  className="relative inline-block text-left"
                  ref={productRef}
                >
                  <button
                    data-dropdown="product"
                    onClick={() => {
                      setIsProductDropdownOpen(!isProductDropdownOpen);
                      setIsDropdownOpen(false); // Close the other if open
                    }}
                    className="flex items-center gap-1 text-[#003d29] font-bold hover:text-[#00823b] cursor-pointer transition"
                  >
                    Products{" "}
                    {isProductDropdownOpen ? (
                      <ChevronUp size={16} className="cursor-pointer" />
                    ) : (
                      <ChevronDown size={16} className="cursor-pointer" />
                    )}
                  </button>

                  {isProductDropdownOpen && (
                    <ul className="absolute mt-3 bg-[#fff8f3] text-gray-800 shadow-lg rounded-xl py-2 px-4 z-50 min-w-[160px] space-y-2">
                      <li
                        onClick={() => {
                          (handleSelect("/allproducts"),
                            setIsProductDropdownOpen(false),
                            setMenuOpen(false));
                        }}
                        className="hover:underline hover:cursor-pointer"
                      >
                        All Products
                      </li>
                      <li
                        onClick={() => {
                          (handleSelect("/serum"),
                            setIsOpen(false),
                            setMenuOpen(false));
                        }}
                        className="hover:underline hover:cursor-pointer"
                      >
                        Serum
                      </li>
                      <li
                        onClick={() => {
                          (handleSelect("/shampoo"),
                            setIsOpen(false),
                            setMenuOpen(false));
                        }}
                        className="hover:underline hover:cursor-pointer"
                      >
                        Shampoo
                      </li>
                      <li
                        onClick={() => {
                          (handleSelect("/soap"),
                            setIsOpen(false),
                            setMenuOpen(false));
                        }}
                        className="hover:underline hover:cursor-pointer"
                      >
                        Soap
                      </li>
                      <li
                        onClick={() => {
                          (handleSelect("/lipgloss"),
                            setIsOpen(false),
                            setMenuOpen(false));
                        }}
                        className="hover:underline hover:cursor-pointer"
                      >
                        Lip Gloss
                      </li>
                      <li
                        onClick={() => {
                          (handleSelect("/organicchocolates"),
                            setIsOpen(false),
                            setMenuOpen(false));
                        }}
                        className="hover:underline hover:cursor-pointer"
                      >
                        Choclates
                      </li>
                      <li
                        onClick={() => {
                          (handleSelect("/candles"),
                            setIsOpen(false),
                            setMenuOpen(false));
                        }}
                        className="hover:underline hover:cursor-pointer"
                      >
                        Candles
                      </li>
                    </ul>
                  )}
                </div>
              </li>

              <li>
                <Link
                  to="/orders"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-green-700 transition"
                >
                  Orders
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-green-700 transition"
                >
                  About
                </Link>
              </li>
              {user?.user?.email === "asadalam4291@gmail.com" ||
                (user?.user?.email === "asadalamalig@gmail.com" && (
                  <li>
                    <Link
                      to="/dashboard"
                      className="font-bold text-red-600"
                      onClick={() => setMenuOpen(false)}
                    >
                      ADMIN
                    </Link>
                  </li>
                ))}
              <li>
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-green-700 transition"
                >
                  Profile
                </Link>
              </li>
              {user ? (
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1 hover:text-green-700 transition"
                  >
                    Logout <MdLogout />
                  </button>
                </li>
              ) : (
                <li>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="hover:text-green-700 transition"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </>
      )}

      {/* Desktop Header-------------------------------------------- */}
      <div className="hidden md:flex items-center justify-between px-8 py-1 bg-[#dfe3d6] border-b-2 border-[#4b9878]">
        <div className="flex items-center gap-6">
          <Link
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            to="/"
            className="text-2xl font-bold text-green-700"
          >
            <div className="">
              <img src={logo} alt="Logo" className="w-14 h-auto rounded" />
            </div>
          </Link>
          <nav className="hidden md:flex gap-6 text-sm text-[#003d29]">
            <Link to="/" className="hover:text-green-700 font-bold">
              Home
            </Link>

            <div className="relative inline-block text-left" ref={productRef}>
              <button
                data-dropdown="product"
                onClick={() => {
                  setIsProductDropdownOpen(!isProductDropdownOpen);
                  setIsDropdownOpen(false); // Close the other if open
                }}
                className="flex items-center gap-1 text-[#003d29] font-bold hover:text-[#00823b] cursor-pointer transition"
              >
                Products{" "}
                {isProductDropdownOpen ? (
                  <ChevronUp size={16} className="cursor-pointer" />
                ) : (
                  <ChevronDown size={16} className="cursor-pointer" />
                )}
              </button>

              {isProductDropdownOpen && (
                <ul className="absolute mt-3 bg-[#fff8f3] text-gray-800 shadow-lg rounded-xl py-2 px-4 z-50 min-w-[160px] space-y-2">
                  <li
                    onClick={() => {
                      (handleSelect("/allproducts"),
                        setIsProductDropdownOpen(false),
                        setMenuOpen(false));
                    }}
                    className="hover:underline hover:cursor-pointer"
                  >
                    All Products
                  </li>
                  <li
                    onClick={() => {
                      (handleSelect("/serum"),
                        setIsOpen(false),
                        setMenuOpen(false));
                    }}
                    className="hover:underline hover:cursor-pointer"
                  >
                    Serum
                  </li>
                  <li
                    onClick={() => {
                      (handleSelect("/shampoo"),
                        setIsOpen(false),
                        setMenuOpen(false));
                    }}
                    className="hover:underline hover:cursor-pointer"
                  >
                    Shampoo
                  </li>
                  <li
                    onClick={() => {
                      (handleSelect("/soap"),
                        setIsOpen(false),
                        setMenuOpen(false));
                    }}
                    className="hover:underline hover:cursor-pointer"
                  >
                    Soap
                  </li>
                  <li
                    onClick={() => {
                      (handleSelect("/lipgloss"),
                        setIsOpen(false),
                        setMenuOpen(false));
                    }}
                    className="hover:underline hover:cursor-pointer"
                  >
                    Lip Gloss
                  </li>
                  <li
                    onClick={() => {
                      (handleSelect("/organicchocolates"),
                        setIsOpen(false),
                        setMenuOpen(false));
                    }}
                    className="hover:underline hover:cursor-pointer"
                  >
                    Choclates
                  </li>
                  <li
                    onClick={() => {
                      (handleSelect("/candles"),
                        setIsOpen(false),
                        setMenuOpen(false));
                    }}
                    className="hover:underline hover:cursor-pointer"
                  >
                    Candles
                  </li>
                </ul>
              )}
            </div>

            <Link to={"/orders"} className="hover:text-green-700 font-bold">
              Orders
            </Link>
            <Link to="/about" className="hover:text-green-700 font-bold">
              About
            </Link>
            {user?.email === "asadalam4291@gmail.com" ||
              (user?.email === "asadalamalig@gmail.com" && (
                <Link to="/dashboard" className="text-red-600 font-bold">
                  Admin
                </Link>
              ))}
          </nav>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-8">

          {/* Search Icon/Input on Large Screens */}
          <div className="relative hidden sm:flex items-center">
            {!searchBarOpen ? (
              <button
                onClick={() => setSearchBarOpen(true)}
                className="text-xl cursor-pointer"
              >
                <RiSearchLine
                  className="text-black hover:text-[#449474]"
                  size={21}
                />
              </button>
            ) : (
              <input
                type="text"
                autoFocus
                placeholder="Search products..."
                value={searchkey}
                onChange={(e) => setSearchkey(e.target.value)}
                onBlur={() => setSearchBarOpen(false)}
                className="px-4 py-1 border border-gray-300 bg-amber-50 rounded-md outline-none w-60 transition"
                style={{ maxWidth: "260px" }}
              />
            )}
          </div>

          {/* Profile/Login */}
          {user ? (
            <div className="relative inline-block text-left" ref={userRef}>
              <button
                data-dropdown="user"
                onClick={() => {
                  setIsUserDropdownOpen(!isUserDropdownOpen);
                  setMenuOpen(false);
                }}
                className="flex items-center gap-1 text-[#FF4F0F] font-bold hover:text-[#03A6A1] transition cursor-pointer"
              >
                <img
                  src={
                    profile?.photoURL ||
                    "https://ui-avatars.com/api/?name=" + user.email
                  }
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover object-top border-1 border-[#03A6A1] cursor-pointer"
                  
                />
              </button>

              {isUserDropdownOpen && (
                <ul className="absolute mt-3 right-0 bg-[#FFE3BB] text-[#03A6A1] shadow-lg rounded-xl py-2 px-4 z-50 min-w-[160px] space-y-2">
                  <li
                    onClick={() => handleSelect("/profile")}
                    className="hover:text-[#FF4F0F] cursor-pointer flex items-center gap-1"
                  >
                    <img
                      src={
                        profile?.photoURL ||
                        "https://ui-avatars.com/api/?name=" + user.email
                      }
                      alt="Profile"
                      className="w-5 h-5 rounded-full object-cover object-top border border-[#03A6A1] cursor-pointer"
                    />
                    Profile
                  </li>
                  <li
                    onClick={handleLogout}
                    className="hover:text-[#FF4F0F] cursor-pointer flex items-center gap-1"
                  >
                    <IoLogOut size={20} />
                    Logout
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              title="Login"
              className="flex flex-col hover:text-[#449474]"
            >
              <p className="flex items-center gap-1 ">
                <FaUserAlt />
                <span className="font-bold">Login</span>
              </p>
            </Link>
          )}
          
          <Link
            to="/cart"
            className="relative flex items-center text-sm hover:text-[#3a9a72] font-bold "
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="ml-1">Cart</span>
            <span className="absolute -top-2 -right-3 bg-[#449474] text-white text-xs rounded-full px-1">
              {(cartItems || []).length}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
