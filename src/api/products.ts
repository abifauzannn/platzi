import axios from "../utils/axioxInstance";

export const getProducts = async () => {
  const response = await axios.get("/products");
  return response.data;
  console.log(response.data);
};

export const getProductByCategory = async (categoryId: number) => {
  const response = await axios.get(`/products/?categoryId=${categoryId}`);
  return response.data;
};
