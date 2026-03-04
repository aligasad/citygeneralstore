import { useEffect, useState } from "react";
import { useData } from "../../../context/data/MyState";

function AddProduct() {
  const context = useData();
  const { products, setProducts, addProduct } = context;

  // Image uploade on Cloudinary-----------------------
  const [loading, setLoading] = useState(false);
  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setLoading(true);

    const uploadedImages = [];

    for (let file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "CityGeneralStore");
      formData.append("cloud_name", "ddwrazqlt");
      formData.append("folder", "City General Store");

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/ddwrazqlt/image/upload",
          {
            method: "POST",
            body: formData,
          },
        );

        const data = await res.json();
        uploadedImages.push(data.secure_url);
      } catch (error) {
        console.error("Upload Error:", error);
      }
    }

    setProducts({
      ...products,
      images: [...products.images, ...uploadedImages],
    });

    setLoading(false);
  };

  return (
    <div className="py-6 min-h-screen bg-gradient-to-br from-green-50 to-lime-100 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 border border-green-100">
        <h1 className="text-center text-2xl font-extrabold text-green-800 mb-6 tracking-wide">
          Add New Product
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

          {/* ✅ Multiple Image Upload */}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="bg-green-50 border px-4 py-2 rounded-lg cursor-pointer"
          />

          {loading && (
            <p className="text-sm text-green-600">Uploading images...</p>
          )}

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

          <input
            type="text"
            name="category"
            className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Category"
            value={products.category}
            onChange={(e) =>
              setProducts({ ...products, category: e.target.value })
            }
          />
          <input
            type="text"
            name="type"
            className="bg-green-50 border border-green-200 px-4 py-2 rounded-lg text-gray-800 placeholder:text-green-400 outline-none focus:ring-2 focus:ring-green-300"
            placeholder="Type"
            value={products.type}
            onChange={(e) => setProducts({ ...products, type: e.target.value })}
          />
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
                className="accent-rose-500 w-4 h-4"
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
        <button
          onClick={addProduct}
          className="mt-6 w-full bg-gradient-to-r from-green-400 to-lime-400 text-white font-bold py-2 rounded-lg shadow hover:from-green-500 hover:to-lime-500 transition cursor-pointer"
        >
          Add Product
        </button>
      </div>
    </div>
  );
}

export default AddProduct;
