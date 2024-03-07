import userInterseption from "../utils/intreceptors/userinterceptors";
const UserApi = userInterseption;

export async function userSignUp(signUpData) {
  try {
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
    const data = await UserApi.post("/verifyotp", otpData);
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
    return data2;
  } catch (error) {
    console.log(error);
  }
}
export async function verifyuser(userData) {
  try {
    const data2 = await UserApi.post("/", userData, { withCredentials: true });
    return data2;
  } catch (error) {
    console.log(error);
  }
}

export async function forgotPass(forgotData) {
  try {
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
    const response = await UserApi.post("/enrollments", { userId });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function checkout(courseid) {
  try {
    const response = await UserApi.post(
      "/checkout",
      { courseid },
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
    const response = await UserApi.post("/addReview", { data });
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
export async function createChat(data) {
  try {
    const response = await UserApi.post(`/createChat`, data);
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
export async function getMessages(id) {
  try {
    const response = await UserApi.get(`/getMeassage/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function sendMessage(data) {
  try {
    const response = await UserApi.post(
      `/createMessage`,
      { data },
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

export async function postCommnets(data) {
  try {
    const response = await UserApi.post(`/postCommnets`, { data });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function LoadComments(id) {
  try {
    const response = await UserApi.get(`/getCommnets/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createBlog(data) {
  try {
    const response = await UserApi.post("/createBlog", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}
export async function getBlog() {
  try {
    const response = await UserApi.get("/getBlogs");
    return response;
  } catch (error) {
    console.log(error);
  }
}
export async function updateRating(data) {
  try {
    const response = await UserApi.put("/courseRating", { data });
    return response;
  } catch (error) {
    console.log(error);
  }
}
export async function getUserCourseRating(id) {
  try {
    const response = await UserApi.get(`/getRating/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function checkConnection(data) {
  try {
    const response = await UserApi.post(`/checkConnection`, data);
    return response;
  } catch (error) {
    console.log(error);
  }
}
export async function SuccessRequest(buyData) {
  try {
    const res = await UserApi.post(`/success`, { data: buyData });
    return res;
  } catch (error) {
    console.log(error);
  }
}
export async function Certificateadded(data) {
  try {
    const res = await UserApi.post(`/certificate`, { data: data });
    return res;
  } catch (error) {
    console.log(error);
  }
}
export async function checkingUser(id) {
  try {
    const res = await UserApi.get(`/checkUser/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
}