import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaUser, FaCartPlus } from "react-icons/fa";
import { AiFillShopping, AiFillPlusCircle, AiFillDelete } from "react-icons/ai";
import { useData } from "../../../context/data/MyState";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

function DashboardTab() {
  const context = useData();
  const {
    mode,
    product,
    editHandle,
    deleteProduct,
    order,
    users,
    searchkey,
    filterType,
    filterPrice,
  } = context;

  // ---Debouncing Functionality for SearchKey----------------------------
  const [debouncedSearchKey, setDebouncedSearchKey] = useState(searchkey);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchKey(searchkey);
    }, 600);
    return () => {
      clearTimeout(handler);
    };
  }, [searchkey]);

  console.log(product);
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const add = () => {
    window.location.href = "/addproduct";
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="tab container mx-auto ">
          <Tabs defaultIndex={0} className=" ">
            <TabList className="md:flex md:space-x-8 bg-  grid grid-cols-2 text-center gap-4   md:justify-center mb-10 ">
              <Tab>
                <button
                  type="button"
                  className="font-medium border-b-2 hover:shadow-purple-700 border-purple-500 text-purple-500 rounded-lg text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]  px-5 py-1.5 text-center cursor-pointer bg-[#605d5d12] "
                >
                  <div className="flex gap-2 items-center">
                    <MdOutlineProductionQuantityLimits />
                    Products
                  </div>{" "}
                </button>
              </Tab>
              <Tab>
                <button
                  type="button"
                  className="font-medium border-b-2 border-[#439373] bg-[#605d5d12] text-[#439373]  hover:shadow-[#306852]  rounded-lg text-xl shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]    px-5 py-1.5 text-center cursor-pointer "
                >
                  <div className="flex gap-2 items-center">
                    <AiFillShopping /> Order
                  </div>
                </button>
              </Tab>
              <Tab>
                <button
                  type="button"
                  className="font-medium border-b-2 border-green-500 bg-[#605d5d12] text-green-500 rounded-lg text-xl  hover:shadow-green-700 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]   px-5 py-1.5 text-center cursor-pointer "
                >
                  <div className="flex gap-2 items-center">
                    <FaUser /> Users
                  </div>
                </button>
              </Tab>
            </TabList>
            {/* product  */}
            <TabPanel>
              <div className="  px-4 md:px-0 mb-16">
                <h1
                  className=" text-center mb-5 text-3xl font-semibold underline"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Product Details
                </h1>
                <div className=" flex justify-end">
                  <button
                    onClick={add}
                    type="button"
                    className="text-white bg-[#439373] hover:bg-[#437f67] font-semibold rounded-lg text-sm px-5 py-2.5 mb-2 mr-4 transition-all duration-300 shadow-md cursor-pointer"
                    style={{
                      backgroundColor: mode === "dark" ? "#232F3E" : "",
                      color: mode === "dark" ? "white" : "",
                    }}
                  >
                    <div className="flex gap-2 items-center">
                      Add Product <FaCartPlus size={20} />
                    </div>
                  </button>
                </div>
                <div className="relative overflow-x-auto ">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400  ">
                    <thead
                      className="text-xs border border-gray-600 text-black uppercase bg-gray-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]"
                      style={{
                        backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                        color: mode === "dark" ? "white" : "",
                      }}
                    >
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          S.No
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Image
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Category
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Type
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Action
                        </th>
                      </tr>
                    </thead>
                    {product
                      .filter((obj) => {
                        const key = debouncedSearchKey
                          ?.toLowerCase()
                          ?.trim()
                          ?.replace(/\s+/g, " ");
                        return (
                          obj.title.toLowerCase().includes(key) ||
                          obj.type.toLowerCase().includes(key) ||
                          obj.category.toLowerCase().includes(key)
                        );
                      })
                      .filter((item) =>
                        item.category
                          ?.replace(/\s+/g, "")
                          ?.toLowerCase()
                          ?.includes(filterType)
                      )
                      .filter((obj) => obj.price.trim().includes(filterPrice))
                      .map((item, index) => {
                        const {
                          title,
                          price,
                          images,
                          category,
                          type,
                          description,
                          date,
                        } = item;
                        return (
                          <tbody key={index} className="">
                            <tr
                              className="bg-gray-50 border-b  dark:border-gray-700"
                              style={{
                                backgroundColor:
                                  mode === "dark" ? "rgb(46 49 55)" : "",
                                color: mode === "dark" ? "white" : "",
                              }}
                            >
                              <td
                                className="px-6 py-4 text-black font-bold"
                                style={{
                                  color: mode === "dark" ? "white" : "",
                                }}
                              >
                                {index + 1}
                              </td>
                              <th
                                scope="row"
                                className="px-6 py-4 font-medium text-black whitespace-nowrap"
                              >
                                <img
                                  className="w-16"
                                  src={images[0]}
                                  alt="img"
                                />
                              </th>
                              <td
                                className="px-6 py-4 text-black "
                                style={{
                                  color: mode === "dark" ? "white" : "",
                                }}
                              >
                                {title}
                              </td>
                              <td
                                className="px-6 py-4 text-black "
                                style={{
                                  color: mode === "dark" ? "white" : "",
                                }}
                              >
                                {"$" + price}
                              </td>
                              <td
                                className="px-6 py-4 text-black "
                                style={{
                                  color: mode === "dark" ? "white" : "",
                                }}
                              >
                                {category}
                              </td>
                              <td
                                className="px-6 py-4 text-black "
                                style={{
                                  color: mode === "dark" ? "white" : "",
                                }}
                              >
                                {type}
                              </td>
                              <td
                                className="px-6 py-4 text-black "
                                style={{
                                  color: mode === "dark" ? "white" : "",
                                }}
                              >
                                {date}
                              </td>
                              <td className="px-6 py-4">
                                <div className=" flex gap-2">
                                  <div
                                    className=" flex gap-2 cursor-pointer text-black "
                                    style={{
                                      color: mode === "dark" ? "white" : "",
                                    }}
                                  >
                                    <div className="flex gap-4">
                                      <div className="text-xl hover:text-red-700">
                                        <AiFillDelete
                                          onClick={() => deleteProduct(item)}
                                        />
                                      </div>
                                      <div className="text-xl hover:text-red-700">
                                        <Link to={"/updateproduct"}>
                                          <FaEdit
                                            onClick={() => editHandle(item)}
                                          />
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        );
                      })}
                  </table>
                </div>
              </div>
            </TabPanel>
            {/* orders  */}
            {/* <TabPanel>
              <div className="relative overflow-x-auto mb-16">
                <h1
                  className="text-center mb-5 text-3xl font-semibold underline"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  Order Details
                </h1>

                {order.map((allOrder, index) => {
                  return (
                    <table
                      key={index}
                      className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
                    >
                      <thead
                        className="text-xs text-black uppercase bg-gray-200"
                        style={{
                          backgroundColor:
                            mode === "dark" ? "rgb(46 49 55)" : "",
                          color: mode === "dark" ? "white" : "",
                        }}
                      >
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            Payment Id
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Image
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Title
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Price
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Category
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Address
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Pincode
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Phone Number
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Email
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Status
                          </th>
                        </tr>
                      </thead>

                      {allOrder.cartItems.map((item, index) => {
                        const { title, price, category, imageUrl, status } =
                          item;

                        return (
                          <tbody key={index}>
                            <tr
                              className="bg-gray-50 border-b dark:border-gray-700"
                              style={{
                                backgroundColor:
                                  mode === "dark" ? "rgb(46 49 55)" : "",
                                color: mode === "dark" ? "white" : "",
                              }}
                            >
                              <td className="px-6 py-4">
                                {allOrder.paymentId}
                              </td>
                              <td className="px-6 py-4">
                                <img
                                  className="w-16"
                                  src={imageUrl}
                                  alt="img"
                                />
                              </td>
                              <td className="px-6 py-4 line-clamp-1">{title}</td>
                              <td className="px-6 py-4">${price}</td>
                              <td className="px-6 py-4">{category}</td>
                              <td className="px-6 py-4">
                                {allOrder.addressInfo.name}
                              </td>
                              <td className="px-6 py-4">
                                {allOrder.addressInfo.address}
                              </td>
                              <td className="px-6 py-4">
                                {allOrder.addressInfo.pincode}
                              </td>
                              <td className="px-6 py-4">
                                {allOrder.addressInfo.phoneNumber}
                              </td>
                              <td className="px-6 py-4">{allOrder.email}</td>
                              <td className="px-6 py-4">{allOrder.date}</td>
                              <td className="px-6 py-4">
                                <span
                                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                    status === "Cancelled"
                                      ? "bg-red-200 text-red-700"
                                      : "bg-green-200 text-green-700"
                                  }`}
                                >
                                  {status || "Active"}
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        );
                      })}
                    </table>
                  );
                })}
              </div>
            </TabPanel> */}

            <TabPanel>
              <div className="relative overflow-x-auto mb-16 max-w-6xl mx-auto px-4">
                <h1
                  className="text-center mb-10 text-4xl font-extrabold tracking-wide"
                  style={{
                    color: mode === "dark" ? "#CFF6D1" : "#006241",
                    fontFamily: "Poppins, sans-serif",
                  }}
                >
                  Order Details
                </h1>

                {order.map((allOrder, index) => (
                  <div
                    key={index}
                    className={`mb-10 border rounded-3xl transition-all duration-300 hover:shadow-lg hover:scale-[1.01] ${
                      mode === "dark"
                        ? "bg-[#1f2421] border-[#CFF6D1]/30 shadow-[#CFF6D1]/10"
                        : "bg-[#F6F4E6] border-[#CFF6D1]/60 shadow-[#CFF6D1]/30"
                    }`}
                  >
                    <div
                      className={`flex flex-col md:flex-row justify-between items-start md:items-center p-6 gap-4 border-b ${
                        mode === "dark"
                          ? "border-[#CFF6D1]/20"
                          : "border-[#CFF6D1]/50"
                      }`}
                    >

                      {/* CUSTOMER DETAILS */}
                      <div className="space-y-1 text-sm">
                        <h2
                          className="text-lg font-semibold mb-2"
                          style={{
                            color: mode === "dark" ? "#CFF6D1" : "#006241",
                          }}
                        >
                          Customer Info
                        </h2>
                        <p className="text-gray-700">
                          <span className="font-semibold text-[#FF8C2F]">
                            Name:
                          </span>{" "}
                          {allOrder.addressInfo.name}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold text-[#FF8C2F]">
                            Email:
                          </span>{" "}
                          {allOrder.email}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold text-[#FF8C2F]">
                            Phone:
                          </span>{" "}
                          {allOrder.addressInfo.phoneNumber}
                        </p>
                      </div>

                      {/* CUSTOMERS ADDRESS */}
                      <div className="space-y-1 text-sm">
                        <p className="text-gray-700">
                          <span className="font-semibold text-[#FF8C2F]">
                            Address:
                          </span>{" "}
                          {allOrder.addressInfo.address}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold text-[#FF8C2F]">
                            Pincode:
                          </span>{" "}
                          {allOrder.addressInfo.pincode}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold text-[#FF8C2F]">
                            Payment ID:
                          </span>{" "}
                          {allOrder.paymentId}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold text-[#FF8C2F]">
                            Date:
                          </span>{" "}
                          {allOrder.date}
                        </p>
                      </div>
                    </div>

                    {/* ORDERED ITEM TABLE */}
                    <div className="overflow-x-auto p-5">
                      <h3
                        className="text-xl font-semibold mb-4"
                        style={{
                          color: mode === "dark" ? "#CFF6D1" : "#006241",
                        }}
                      >
                        Ordered Products
                      </h3>

                      <table className="w-full text-sm border-collapse overflow-hidden rounded-2xl shadow-md">
                        <thead
                          className={`text-xs uppercase ${
                            mode === "dark"
                              ? "bg-[#006241] text-[#CFF6D1]"
                              : "bg-[#CFF6D1]/50 text-[#1E1E1E]"
                          }`}
                        >
                          <tr>
                            <th className="px-4 py-3 font-semibold text-left">
                              Image
                            </th>
                            <th className="px-4 py-3 font-semibold text-left">
                              Title
                            </th>
                            <th className="px-4 py-3 font-semibold text-left">
                              Category
                            </th>
                            <th className="px-4 py-3 font-semibold text-left">
                              Quantity
                            </th>
                            <th className="px-4 py-3 font-semibold text-left">
                              Price
                            </th>
                            <th className="px-4 py-3 font-semibold text-left">
                              Status
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {allOrder.cartItems.map((item, idx) => {
                            const {
                              title,
                              price,
                              category,
                              type,
                              quan,
                              imageUrl,
                              status,
                            } = item;

                            return (
                              <tr
                                key={idx}
                                className={`transition-all duration-300 ${
                                  mode === "dark"
                                    ? "hover:bg-[#2c322f] border-b border-[#CFF6D1]/20"
                                    : "hover:bg-[#CFF6D1]/20 border-b border-[#CFF6D1]/40"
                                }`}
                              >
                                <td className="px-4 py-3">
                                  <img
                                    src={imageUrl}
                                    alt={title}
                                    className="w-16 h-16 object-cover rounded-lg border border-[#CFF6D1]/50 shadow-sm"
                                  />
                                </td>

                                <td className="px-4 py-3">
                                  <p className="font-semibold text-gray-900 ">
                                    {title.length > 40
                                      ? title.slice(0, 40) + "..."
                                      : title}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    {type}
                                  </p>
                                </td>

                                <td className="px-4 py-3">
                                  <p className="font-medium text-gray-800">
                                    {category}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Organic Product
                                  </p>
                                </td>

                                <td className="px-4 py-3">
                                  <p className="font-semibold text-[#006241]">
                                    {quan} Items
                                  </p>
                                </td>

                                <td className="px-4 py-3">
                                  <p className="font-semibold text-[#006241]">
                                    ${price}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    Incl. taxes
                                  </p>
                                </td>

                                <td className="px-4 py-3">
                                  <span
                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                      status === "Cancelled"
                                        ? "bg-red-100 text-red-700"
                                        : "bg-[#FF8C2F]/20 text-[#FF8C2F]"
                                    }`}
                                  >
                                    {status || "Active"}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* TOTAL AMOUNT */}
                    <div
                      className={`flex justify-end p-5 text-sm font-semibold border-t ${
                        mode === "dark"
                          ? "border-[#CFF6D1]/30"
                          : "border-[#CFF6D1]/40"
                      }`}
                    >
                      <p
                        style={{
                          color: mode === "dark" ? "#CFF6D1" : "#006241",
                        }}
                      >
                        Total Amount:{" "}
                        <span className="ml-1 font-bold text-[#FF8C2F]">
                          
                          {(() => {
                            // Calculate total price (excluding cancelled items)
                            const total = allOrder.cartItems
                              .filter((i) => i.status !== "Cancelled")
                              .reduce((acc, i) => acc + i.price * i.quan, 0);

                            // Add shipping if total < 60
                            const finalTotal = total < 60 ? total + 5 : total;

                            // Return formatted value with 2 decimals
                            return (
                              <span className="text-lg font-bold text-green-600">
                                ${finalTotal.toFixed(2)}{" "}
                                {total < 60 ? (
                                  total === 0 ? (
                                    <span className="text-xs text-gray-500"></span>
                                  ) : (
                                    <span className="text-xs text-gray-500">
                                      (Incl. $5 Shipping)
                                    </span>
                                  )
                                ) : (
                                  <span className="text-xs text-gray-500">
                                    (Shipping Free)
                                  </span>
                                )}
                              </span>
                            );
                          })()}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabPanel>

            {/* users  */}
            <TabPanel>
              {/* <User addressInfo={addressInfo} setAddressInfo={setAddressInfo} setLoading={setLoading} /> */}
              <div className="relative overflow-x-auto mb-10">
                <h1
                  className=" text-center mb-5 text-3xl font-semibold underline"
                  style={{ color: mode === "dark" ? "white" : "" }}
                >
                  User Details
                </h1>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead
                    className="text-xs text-black uppercase bg-gray-200 "
                    style={{
                      backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                      color: mode === "dark" ? "white" : "",
                    }}
                  >
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        S.No
                      </th>

                      <th scope="col" className="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3">
                        UID Number
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date(YYYY-MM-DD)
                      </th>
                    </tr>
                  </thead>
                  {users.map((user, index) => {
                    console.log("USER DETAILS", user);
                    const { name, uid, email, signedupAt } = user;
                    return (
                      <tbody key={index}>
                        <tr
                          className="bg-gray-50 border-b  dark:border-gray-700"
                          style={{
                            backgroundColor:
                              mode === "dark" ? "rgb(46 49 55)" : "",
                            color: mode === "dark" ? "white" : "",
                          }}
                        >
                          <td
                            className="px-6 py-4 text-black "
                            style={{ color: mode === "dark" ? "white" : "" }}
                          >
                            {index + 1}.
                          </td>
                          <td
                            className="px-6 py-4 text-black"
                            style={{ color: mode === "dark" ? "white" : "" }}
                          >
                            {name}
                          </td>
                          <td
                            className="px-6 py-4 text-black "
                            style={{ color: mode === "dark" ? "white" : "" }}
                          >
                            {email}
                          </td>
                          <td
                            className="px-6 py-4 text-black "
                            style={{ color: mode === "dark" ? "white" : "" }}
                          >
                            {uid?.slice(0, 15)}.....
                          </td>
                          <td
                            className="px-6 py-4 text-black "
                            style={{ color: mode === "dark" ? "white" : "" }}
                          >
                            {signedupAt?.slice(0, 10)}
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default DashboardTab;
