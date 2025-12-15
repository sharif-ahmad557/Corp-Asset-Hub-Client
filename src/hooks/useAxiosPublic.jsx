import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://corp-asset-hub-server-oayt.vercel.app/",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
