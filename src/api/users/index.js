import axios from "axios";

export async function grabAllUsers() {
  try {
    const { data } = await axios.get("/api/users");
    console.log(data, "USERS GRABBED");
    return data.users;
  } catch (error) {
    throw error;
  }
}


