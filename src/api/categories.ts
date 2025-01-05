import axios from "axios";

const BASE_URL = "https://api.escuelajs.co/api/v1";

// Get all categories
export const getCategories = async () => {
  const response = await axios.get(`${BASE_URL}/categories`);

  console.log(response);
};

// Get products by category ID
export const getProductsByCategory = async (categoryId: number) => {
  const response = await axios.get(`${BASE_URL}/products/?categoryId=${categoryId}`);
  return response.data;
};
