// import axios from "axios";

// const UserApi = axios.create({
//   baseURL: `http://localhost:3000`,
// });
// let userData = JSON.parse(localStorage.getItem("userData"));
// let token;
// if (userData) {
//   token = userData.token;
// }
// axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
// axios.defaults.headers.post["Content-Type"] = "application/json";
// axios.interceptors.request.use(
//   (request) => {
//     return request;
//   },
//   (error) => {
//     //  console.log(error);
//     return Promise.reject(error);
//   }
// );
// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     console.log(error.response);
//     return Promise.reject(error);
//   }
// );
// import UserApi from '../utils/userinterceptors'
import userInterseption from '../utils/intreceptors/userinterceptors';
const UserApi=userInterseption;
console.log(UserApi,'UserApiUserApiUserApiUserApi');
export async function userSignUp(signUpData) {
  try {
    console.log(signUpData);
    const data = await UserApi.post("/signup", signUpData, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
}
export async function UserSendingOtp(otpData) {
  try {
    const data = await UserApi.post("/sendotp", otpData);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function UserVerifyOtp(otpData) {
  try {
    console.log("ssssssqqqqqq");
    const data = await UserApi.post("/verifyotp", otpData);
    console.log(data, "///////////////////////////");
    return data;
  } catch (err) {
    console.log(err);
  }
}
export async function userLogin(loginData) {
  try {
    const data2 = await UserApi.post("/login", loginData, {
      withCredentials: true,
    });
    console.log(data2, "ttttttttttttttttt");
    return data2;
  } catch (error) {
    console.log(error);
  }
}
export async function verifyuser(userData) {
  try {
    const data2 = await UserApi.post("/", userData, { withCredentials: true });
    console.log(data2, "ttttttttttttttttt");
    return data2;
  } catch (error) {
    console.log(error);
  }
}

export async function forgotPass(forgotData) {
  try {
    console.log(forgotData, "forgotpass");
    const data = await UserApi.post("/forgotPass", forgotData);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function passverifyOTP(newData) {
  try {
    console.log("0000000002222222222222222222");
    const data = await UserApi.post("/newPass", newData);
    console.log(data, "///////111111111111111111111111////////////////////");
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function updatePass(updateData) {
  try {
    const data = await UserApi.put("/updateaPass", updateData);
    console.log(data, "updatePass");
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function userRegisterGoogle(userData) {
  try {
    const response = await UserApi.post("/userRegisterWithGoole", userData);
    return response;
  } catch (error) {
    console.log(error);
  }
}
export async function getUserData(userData) {
  try {
    console.log(userData,'zzz');
    const response = await UserApi.get("/getUser", userData);
    return response;
  } catch (error) {
    console.log(error);
  }
}
export async function UpdateProfile(updateData) {
  try {
    const response = await UserApi.post("/updateProfile", updateData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function profileuser(userData) {
  try {
    console.log(userData,'zzz');
    const response = await UserApi.get("/manageProfile", { params: userData });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getCourse(newData) {
  try {
    console.log(newData,'zzz');
    const response = await UserApi.get("/getCourse", newData);
    return response;
  } catch (error) {
    console.log(error);
  }
}
export async function UpdateUser(newData) {
  try {
    console.log(newData,'zzz');
    const response = await UserApi.post("/updateuser", newData);
    return response;
  } catch (error) {
    console.log(error);
  }
}


