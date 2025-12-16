import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://corp-asset-hub-server-3d4k.vercel.app/",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
