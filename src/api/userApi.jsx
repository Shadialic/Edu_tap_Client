import userInterseption from "../utils/intreceptors/userinterceptors";
const UserApi = userInterseption;
console.log(UserApi, "UserApiUserApiUserApiUserApi");
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
    const data = await UserApi.post("/newPass", newData);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function updatePass(updateData) {
  try {
    const data = await UserApi.put("/updateaPass", updateData);
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
    const response = await UserApi.get("/manageProfile", { params: userData });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getCourse(newData) {
  try {
    const response = await UserApi.get("/getCourse", newData);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function UpdateUser(newData) {
  try {
    const response = await UserApi.post("/updateuser", newData);
    return response;
  } catch (error) {
    console.log(error);
  }
}
export async function LoadCategory() {
  try {
    const response = await UserApi.get("/LoadCategory");
    return response;
  } catch (error) {
    console.log(error);
  }
}
export async function purchaseCourse(id, userId) {
  try {
    console.log(id, "popopop0000000000000op", userId);
    const response = await UserApi.put(`/purchaseCourse/${id}`, {
      userid: userId,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function enrollments(userId) {
  try {
    console.log("popopop0000000000000op", userId);
    const response = await UserApi.post("/enrollments", { userId });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function checkout(courseid) {
  try {
    console.log("courseid", courseid);
    const response = await UserApi.post("/checkout",{ courseid },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function postReview(data) {
  try {
    console.log("courseid", data);
    const response = await UserApi.post("/addReview",{data});
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchReviews() {
  try {
  
    const response = await UserApi.get("/fetchReview");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getChats(id) {
  try {
    const response = await UserApi.get(`/findUserChats/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
