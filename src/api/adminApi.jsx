import adminInterseption from "../utils/intreceptors/admininterceptors";
const AdminApi = adminInterseption;

//============================== ADDMIN SIGNIN =================================//
export async function AdminSignIn(userData) {
  try {
    const response = await AdminApi.post("/login", userData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error; 
  }
}
export async function LoadUserList(userData) {
  try {
    const admindata = await AdminApi.post("/loadusers", userData);
    return admindata;
  } catch (error) {
    console.log(error);
  }
}

export async function LoadTutorList(tutorData) {
  try {

    const admindata = await AdminApi.get("/loadtutor", tutorData);
    return admindata;
  } catch (error) {
    console.log(error);
  }
}

export async function BlockUnblockuser(id) {
  try {
    const admindata = await AdminApi.put(`/blockuser/${id}`);
    return admindata;
  } catch (error) {
    console.log(error);
  }
}

export async function BlockUnblockTutor(tutorData) {
  try {
    const admindata = await AdminApi.put("/blocktutor", tutorData);
    return admindata;
  } catch (error) {
    console.log(error);
  }
}
export async function apporvTutor(tutorId) {
  try {
    const response = await AdminApi.put("/approvTutor", tutorId);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function ManageCategory(category) {
  try {
    const response = await AdminApi.post("/addCategory", category);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function loadCategory(category) {
  try {
    const response = await AdminApi.get("/getCategory", category);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function LoadCourse(newData) {
  try {
    const response = await AdminApi.get("/getCourse", newData);
    return response;
  } catch (error) {
    console.log(error);
  }
}
export async function manageCourse(Course_id) {
  try {
    const response = await AdminApi.put("/manageCourse", Course_id);
    return response;
  } catch (error) {
    console.log(error);
  }
}
export async function getCourse(data) {
  try {
    const response = await AdminApi.get("/getCourse", data);
    return response;
  } catch (error) {
    console.log(error);
  }
}
export async function BlockingCourse(course_id) {
  try {
    const response = await AdminApi.put("/blockCourse", course_id);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function manageBlock(course_id) {
  try {
    const response = await AdminApi.put(`/managecategory/${course_id}`, );
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function postOffer(data) {
  try {
    const response = await AdminApi.post(`/postOffer`, data);
    return response;
  } catch (error) {
    console.log(error);
  }
}
export async function loadOffer(data) {
  try {
    const response = await AdminApi.get(`/loadOffer`);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchPaymentReport() {
  try {
    const response = await AdminApi.get(`/fetchPaymentReport`);
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function getDashboardData() {
  try {
    const response = await AdminApi.get(`/getDashboardData`);
    return response;
  } catch (error) {
    console.log(error);
  }
}
