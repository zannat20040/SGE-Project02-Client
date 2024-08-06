import axios from "axios";

const axiosBase = axios.create({
  baseURL: "http://localhost:5000",
});

const useAxiosBase = () => {
  return axiosBase;
};

export default useAxiosBase;