import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001/api"
    : "https://slack-backend-lime.vercel.app/api";

    export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

