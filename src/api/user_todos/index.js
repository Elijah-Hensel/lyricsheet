import axios from "axios";

export async function grabAllUserTodos() {
  try {
    const { data } = await axios.get("/api/user-todos");
    console.log(data, "USER TODOS GRABBED");
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createTodo(
  content,
) {
  try {
    const { data } = await axios.post("/api/user-todos", {
      content,
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function editTodo(
  content,
  active
) {
  try {
    const { data } = await axios.patch(`/api/user-todos/id`, {
      content,
      active
    });
    return data;
  } catch (error) {
    throw error;
  }
}