import axios from "axios";

const API_URL  = "http://localhost:3000";

export const getOrderStatistics = async () => {
  try {
    const response = await axios.get(`${API_URL}/orderStatistics`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order statistics:", error);
    throw error;
  }
};
