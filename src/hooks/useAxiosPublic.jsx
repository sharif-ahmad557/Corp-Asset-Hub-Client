import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://corp-asset-hub-server-cyyd.vercel.app/",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
