import axios from "axios";

const axiosBase = axios.create({
  // baseURL: "http://localhost:5000",
  baseURL: "https://sge-project02-backend.vercel.app",
});

const useAxiosBase = () => {
  return axiosBase;
};

export default useAxiosBase;