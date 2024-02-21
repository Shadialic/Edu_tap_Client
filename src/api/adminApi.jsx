import axios from "axios";

const AdminApi = axios.create({
  baseURL: `http://localhost:3000/admin`,
});

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

