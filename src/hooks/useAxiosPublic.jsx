import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://corp-asset-hub-server-2qvn.vercel.app/",
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
