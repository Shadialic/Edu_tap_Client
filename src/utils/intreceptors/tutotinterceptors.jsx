import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3000/vendor",
});

const token = localStorage.getItem("tutortoken");
instance.defaults.headers.common["Authorization"] = token
  ? `Bearer ${token}`
  : "";
instance.defaults.headers.post["Content-Type"] = "application/json";

instance.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
