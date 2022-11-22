import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://frontend.assignment.getliner.com",
  timeout: 5000,
});

