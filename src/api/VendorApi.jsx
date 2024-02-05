// import axios from "axios";

// const TutorApi = axios.create({
//   baseURL: "http://localhost:3000/vendor",
// });
import tutorInterseption from '../utils/intreceptors/tutotinterceptors';

const TutorApi=tutorInterseption;
export async function TutorSignUp(signUpData) {
  try {
    console.log(signUpData, "222222222222");
    const data = await TutorApi.post("/vendor/signup", signUpData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(data,'[][][][][]');
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function TutorSendingOtp(otpData) {
  try {
    const data = await TutorApi.post("/vendor/sendotp", otpData);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function TutorVerifyOtp(otpData) {
  try {
    const data = await TutorApi.post("/vendor/verifyotp", otpData);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function tutorLogin(loginData) {
  try {
    const data2 = await TutorApi.post("/vendor/login", loginData);
    console.log(data2, "sadasa2wewq");
    return data2;
  } catch (error) {
    console.log(error);
  }
}
export async function tutorRegisterGoogle(tutorData) {
  try {
    const response = await TutorApi.post(
      "/vendor/tutorRegisterWithGoole",
      tutorData
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function CoursrManage(newData) {
  try {
    console.log(newData, "newData");
    const response = await TutorApi.post("/vendor/loadCourse", newData
    // , {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getCategory(category) {
  try {
    const response = await TutorApi.get("/vendor/getCategory", category);
    return response;
  } catch (error) {
    console.log(error);
  }
}
export async function profiletutor(tutorData) {
  try {
    console.log(tutorData,'zzz');
    const response = await TutorApi.get("/vendor/manageProfile", { params: tutorData });
    return response;
  } catch (error) {
    console.log(error);
  }
}
export async function UpdateProfile(updateData) {
  try {
    const response = await TutorApi.post("/vendor/updateProfile", updateData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchCoures() {
  try {
    const response = await TutorApi.post("/vendor/getcoures")
    return response;
  } catch (error) {
    console.log(error);
  }
}
export async function manageCourse(id) {
  try {
    console.log(id, 'llll');
    const response = await TutorApi.put(`/vendor/manageCourse/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
}
