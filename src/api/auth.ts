import axios from "../utils/axioxInstance";

export const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("/auth/login", { email, password });
      console.log(response.data);
  
      // Assuming response.data contains 'access_token' and 'refresh_token'
      const { access_token, refresh_token } = response.data;
  
      if (access_token && refresh_token) {
        // Save tokens to localStorage
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
      } else {
        console.error("Tokens not received");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };