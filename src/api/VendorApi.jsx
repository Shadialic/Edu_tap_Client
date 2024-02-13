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
    console.log(data, "ppppp");
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
  console.log(id,"course idd in vendour apiiiiiiiiiii");
  try {
    console.log(formData, "popo==================");
    const response = await TutorApi.post(`/vendor/addChapter/${id}`,formData);
    console.log(response, "p");
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchChapter() {
  try {
    const response = await TutorApi.get('/vendor/getChapter');
    console.log(response, "p");
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function manageChapter(id) {
  try {
    console.log(id,'pop');
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