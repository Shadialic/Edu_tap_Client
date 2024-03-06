import tutorInterseption from "../utils/intreceptors/tutotinterceptors";
const TutorApi = tutorInterseption;

export async function TutorsignUp(signUpData) {
  try {
    const data = await TutorApi.post("/vendor/signup", signUpData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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
    const response = await TutorApi.post("/vendor/loadCourse", newData);
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
    const response = await TutorApi.get("/vendor/manageProfile", {
      params: tutorData,
    });
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
export async function fetchCoures(data) {
  try {
    const response = await TutorApi.post("/vendor/getcoures", data);
    return response;
  } catch (error) {
    console.log(error);
  }
}
export async function manageCourse(id) {
  try {
    const response = await TutorApi.put(`/vendor/manageCourse/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
}
export async function addChapter(formData, id) {
  console.log(formData, id, "");
  try {
    const response = await TutorApi.post(`/vendor/addChapter/${id}`, formData);
    return response;
  } catch (error) {
    console.log(error);
  }
}
export async function fetchChapter() {
  try {
    const response = await TutorApi.get("/vendor/getChapter");
    return response;
  } catch (error) {
    console.log(error);
  }
}
export async function manageChapter(id) {
  try {
    const response = await TutorApi.put(`/vendor/manageChapter/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
}
export async function blockUnBlockcourse(id) {
  try {
    const response = await TutorApi.put(`/vendor/blockunblcoCourse/${id}`);
    return response;
  } catch (error) {
    console.log(error);
  }
}
export async function getTutorChats(id) {
  try {
    const response = await TutorApi.get(`/findTutorChats/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function teacherStudents(id) {
  try {
    const response = await TutorApi.get(`/teacherUsers/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function createGroup(data) {
  try {
    const response = await TutorApi.post(`/createGroupChat`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function fetchPaymentReport(id) {
  try {
    const response = await TutorApi.get(`/fetchPaymentDetailes/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function chekingTutor(id) {
  try {
    const response = await TutorApi.get(`/chekingTutor/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
