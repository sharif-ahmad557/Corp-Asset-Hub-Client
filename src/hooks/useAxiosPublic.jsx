import axios from "axios";

// Use Environment variable for production, fallback to your vercel link
const baseURL =
  import.meta.env.VITE_API_URL ||
  "https://corp-asset-hub-server-3d4k.vercel.app";

const axiosPublic = axios.create({
  baseURL: baseURL,
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
