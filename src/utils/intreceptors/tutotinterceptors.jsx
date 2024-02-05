import axios from "axios";

// axios.defaults.baseURL = "http://localhost:3000/vendor";

// function getCookie(name) {
//   const value = `; ${document.cookie}`;
//   const parts = value.split(`; ${name}=`);
//   if (parts.length === 2) return parts.pop().split(';').shift();
// }
const instance = axios.create({
  baseURL: "http://localhost:3000/vendor"
});

// console.log("Before token retrieval");
const token = localStorage.getItem("tutortoken");
// console.log(token, '------------');
// console.log("After token retrieval");


instance.defaults.headers.common["Authorization"] = token ? `Bearer ${token}` : "";
instance.defaults.headers.post["Content-Type"] = "application/json";

instance.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    // console.error("Request error:", error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    // console.log("Request interceptor - Start:", response);
    return response;
  },
  (error) => {
    // console.error("Response error:", error.response);
    return Promise.reject(error);
  }
);

export default instance;