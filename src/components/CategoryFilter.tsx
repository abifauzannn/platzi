import React, { useState } from "react";
import { BiCategory } from "react-icons/bi";

interface Category {
  id: number;
  name: string;
}

interface Props {
  categories: Category[];
  selectedCategory: number | null;
  onCategorySelect: (categoryId: number | null) => void;
}

const CategoryFilter: React.FC<Props> = ({
  categories,
  selectedCategory,
  onCategorySelect,
}) => {
  // List of allowed categories
  const allowedCategories = [
    "electronics",
    "furniture",
    "shoes",
    "miscellaneous",
    "clothes",
  ];

  // Function to clean up category names (for example, convert "clothessss" to "clothes")
  const cleanCategoryName = (name: string) => {
    return name.replace(/clothessss/i, "clothes"); // Example: replacing "clothessss" with "clothes"
  };

  // Filter categories to include only allowed categories
  const filteredCategories = categories.filter(
    (category) => allowedCategories.includes(category.name.toLowerCase()) // Case insensitive match
  );

  // State to control mobile sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Handle category selection and close the sidebar
  const handleCategorySelect = (categoryId: number | null) => {
    onCategorySelect(categoryId);
    setIsSidebarOpen(false); // Close the sidebar when a category is selected
  };

  return (
    <div className="p-6 lg:p-0">
      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden transition-transform duration-300 transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      ></div>

      <div className="w-full shadow-md border-gray-600 lg:shadow-none lg:border-none rounded-lg px-4 py-2">
        {/* Mobile View - Button to toggle sidebar */}
        <div className="flex justify-between items-center mb-4 lg:hidden">
          <div className="flex items-center gap-1">
            <BiCategory size={20} />
            <h2 className="text-lg font-semibold">Category</h2>
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-600 focus:outline-none"
          >
            {isSidebarOpen ? "Close" : "Open"}
          </button>
        </div>

        {/* Mobile Sidebar Content */}
        <div
          className={`fixed top-0 left-0 h-full bg-white w-64 p-4 shadow-md transform transition-transform duration-300 lg:hidden z-50 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-xl text-gray-600 mb-4"
          >
            Close
          </button>
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => handleCategorySelect(null)}
              className={`px-4 py-2 text-left ${
                selectedCategory === null
                  ? "text-black font-bold border-l-4 border-black"
                  : "text-gray-700 hover:bg-gray-200 hover:border-l-4 hover:border-black"
              } transition-all duration-200`}
            >
              All
            </button>
            {filteredCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={`px-4 py-2 text-left ${
                  selectedCategory === category.id
                    ? "text-black font-bold border-l-4 border-black"
                    : "text-gray-700 hover:bg-gray-200 hover:border-l-4 hover:border-black"
                } transition-all duration-200`}
              >
                {cleanCategoryName(category.name)}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop View - Category List */}
        <div className="hidden lg:block">
          <div className="flex items-center gap-1 mb-4">
            <BiCategory size={20} />
            <h2 className="text-lg font-semibold">Category</h2>
          </div>
          <button
            onClick={() => handleCategorySelect(null)}
            className={`px-4 py-2 block text-left ${
              selectedCategory === null
                ? "text-black font-bold border-l-4 border-black"
                : "text-gray-700 hover:bg-gray-200 hover:border-l-4 hover:border-black"
            } transition-all duration-200`}
          >
            All
          </button>
          {filteredCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className={`px-4 py-2 block text-left ${
                selectedCategory === category.id
                  ? "text-black font-bold border-l-4 border-black"
                  : "text-gray-700 hover:bg-gray-200 hover:border-l-4 hover:border-black"
              } transition-all duration-200`}
            >
              {cleanCategoryName(category.name)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
