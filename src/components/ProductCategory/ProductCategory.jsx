import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useData } from "../../context/data/MyState";




const CategoriesSection = () => {
  const navigate = useNavigate();
  const context = useData();

  const {categories} = context;

  

  const handleClick = (category) => {
    navigate(`/${category.toLowerCase().replace(/\s+/g, "")}`);
  };

  return (
    <div className="px-6 py-5 bg-gradient-to-b from-[#e2fce7] to-[#449474] text-white">
      <h2 className="text-3xl font-bold mb-5  text-center text-[#003d29]">
        Our top <span className="text-[#009235] text-4xl">Categories</span>
      </h2>

      <div className="overflow-x-auto scrollbar-hide">
        
          <div className="flex gap-4 px-1 w-max">
            {categories.map((cat, index) => (
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
                  key={cat.name}
                  onClick={() => handleClick(cat.slug)}
                  className="bg-white text-black min-w-[140px] rounded-lg overflow-hidden cursor-pointer shadow"
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-[150px] sm:w-full h-[160px] object-cover"
                  />
                  <div className="text-center  py-2 text-xs font-medium">
                    {cat.name} →
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
