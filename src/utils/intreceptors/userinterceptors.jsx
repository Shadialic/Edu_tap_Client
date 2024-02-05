import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000"
});

let token = localStorage.getItem("token");
console.log("Token from localStorage:", token);

instance.defaults.headers.common["Authorization"] = token ? `Bearer ${token}` : "";
instance.defaults.headers.post["Content-Type"] = "application/json";

console.log("Authorization Header:", instance.defaults.headers.common["Authorization"]);

instance.interceptors.request.use(
  (request) => {
    console.log("Request interceptor - Start:", request);
    return request;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    console.log("Response interceptor - Start:", response);
    return response;
  },
  (error) => {
    console.error("Response error:", error.response);
    return Promise.reject(error);
  }
);


export default instance;
