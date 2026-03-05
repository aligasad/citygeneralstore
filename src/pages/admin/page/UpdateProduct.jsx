import { useEffect, useState } from "react";
import { useData } from "../../../context/data/MyState";

function UpdateProduct() {
  const context = useData(); // custom hook
  const { products, setProducts, updateProduct, categories } = context;
  const [loading, setLoading] = useState(false);
  // got to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ✅ Image Upload (Replace Images Only If Selected)
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setLoading(true);

    const uploadedImages = [];

    for (let file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "CityGeneralStore");
      formData.append("folder", "City General Store");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/ddwrazqlt/image/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();

      uploadedImages.push({
        url: data.secure_url,
        public_id: data.public_id,
      });
    }

    // ✅ Replace old images only if new selected
    setProducts({
      ...products,
      images: uploadedImages,
    });

    setLoading(false);
  };

  return (
    <div className=" py-3 ">
      <div className=" flex justify-center items-center h-full">
        <div className=" bg-gray-800 px-10 py-5 rounded-xl ">
          <div className="">
            <h1 className="text-center text-white text-xl mb-4 font-bold">
              Update Product
            </h1>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                name="title"
                className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
                placeholder="Product Title"
                value={products.title}
                onChange={(e) =>
                  setProducts({ ...products, title: e.target.value })
                }
              />
              <input
                type="text"
                name="quantity"
                className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
                placeholder="Quantity (e.g., 500g, 1L)"
                value={products.quantity || ""}
                onChange={(e) =>
                  setProducts({ ...products, quantity: e.target.value })
                }
              />
              <input
                type="number"
                name="originalPrice"
                className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
                placeholder="Original Price ($)"
                value={products.originalPrice || ""}
                onChange={(e) =>
                  setProducts({ ...products, originalPrice: e.target.value })
                }
              />
              <input
                type="number"
                name="price"
                className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
                placeholder="Selling Price ($)"
                value={products.price}
                onChange={(e) =>
                  setProducts({ ...products, price: e.target.value })
                }
              />
              <input
                type="text"
                name="brand"
                className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
                placeholder="Brand"
                value={products.brand || ""}
                onChange={(e) =>
                  setProducts({ ...products, brand: e.target.value })
                }
              />
              <input
                type="text"
                name="imageUrl"
                className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
                placeholder="Image URL"
                value={products.imageUrl}
                onChange={(e) =>
                  setProducts({ ...products, imageUrl: e.target.value })
                }
              />
              <input
                type="text"
                name="imageUrl2"
                className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
                placeholder="Image URL"
                value={products.imageUrl2}
                onChange={(e) =>
                  setProducts({ ...products, imageUrl2: e.target.value })
                }
              />
              <input
                type="text"
                name="imageUrl3"
                className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
                placeholder="Image URL"
                value={products.imageUrl3}
                onChange={(e) =>
                  setProducts({ ...products, imageUrl3: e.target.value })
                }
              />
              <input
                type="text"
                name="imageUrl4"
                className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
                placeholder="Image URL"
                value={products.imageUrl4}
                onChange={(e) =>
                  setProducts({ ...products, imageUrl4: e.target.value })
                }
              />

              {/* Preview Images */}
              <div className="grid grid-cols-3 gap-2">
                {products.images?.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="product"
                    className="w-full h-20 object-cover rounded"
                  />
                ))}
              </div>
              {/* Category */}
              <select
                value={products.category || ""}
                onChange={(e) =>
                  setProducts({
                    ...products,
                    category: e.target.value,
                    type: "",
                  })
                }
                className="input"
              >
                <option value="">Select Category</option>

                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              {/* Type */}
              <select
                value={products.type || ""}
                disabled={!products.category}
                onChange={(e) =>
                  setProducts({
                    ...products,
                    type: e.target.value,
                  })
                }
                className="input"
              >
                <option value="">Select Type</option>

                {products.category &&
                  categories
                    .find((cat) => cat.name === products.category)
                    ?.items.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
              </select>

              <textarea
                cols="30"
                rows="4"
                name="description"
                className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
                placeholder="Description"
                value={products.description}
                onChange={(e) =>
                  setProducts({ ...products, description: e.target.value })
                }
              ></textarea>
              {/* Checkboxes */}
              <div className="flex items-center gap-6 mt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={products.isNew || false}
                    onChange={(e) =>
                      setProducts({ ...products, isNew: e.target.checked })
                    }
                    className="accent-green-500 w-4 h-4"
                  />
                  <span className="text-green-700 text-sm">Mark as New</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={products.onSale || false}
                    onChange={(e) =>
                      setProducts({ ...products, onSale: e.target.checked })
                    }
                    className="accent-green-500 w-4 h-4"
                  />
                  <span className="text-green-700 text-sm">On Sale</span>
                </label>
              </div>
            </div>
          </div>
          <div className=" flex justify-center mb-3">
            <button
              onClick={updateProduct}
              className="mt-3 px-6 py-2 bg-[#449474] text-white font-semibold rounded-full hover:bg-[#003d29] transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center space-x-2"
            >
              Update Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
