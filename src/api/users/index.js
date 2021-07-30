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

<<<<<<< HEAD
export async function grabUserByEmail(email) {
  try {
    const { data } = await axios.get(`/api/users/email/${email}`);
    return data.user;
  } catch (err) {
    console.error("Couldn't grab user by email");
    throw err;
  }
}
=======

>>>>>>> main
