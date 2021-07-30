const { client } = require("../index");

async function createUserTodo({user_id, content, active=true}) {
  try {
    const {
      rows: [todo],
    } = await client.query(
      `
        INSERT INTO user_todos(user_id, content, active)
        VALUES($1, $2, $3)
        RETURNING *;
      `,
      [user_id, content, active]
    );
    return todo;
  } catch (err) {
    console.error("Could not createUserTodo!");
    throw err;
  }
}

async function getAllUserTodos() {
  try {
    const { rows: todos } = await client.query(
      `
        SELECT *
        FROM user_todos;
      `
    );
    return todos;
  } catch (err) {
    console.error("Could not get all user todos!");
    throw err;
  }
}

async function updateUserTodo(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  try {
    if (setString.length > 0) {
      await client.query(
        `
        UPDATE products
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
      `,
        Object.values(fields)
      );
    }

    return await getUserTodosById(id);
  } catch (error) {
    throw error;
  }
}

async function getUserTodosById(id) {
  try {
    const { rows: todo } = await client.query(
      `
      SELECT *
      FROM user_todos
      WHERE id=$1
      `,
      [id]
    );

    if (!todo) {
      console.error("No user todo with that id exists");
    }

    return todo;
  } catch (err) {
    console.error("Could not get user todo by id");
    throw err;
  }
}

async function getUserTodosByUserId(userId) {
  try {
    const { rows: todos } = await client.query(
      `
      SELECT *
      FROM user_todos
      WHERE user_id=$1
      `,
      [userId]
    );

    if (!todos) {
      console.error("No todos with that user id exist");
    }

    return todos;
  } catch (err) {
    console.error("Could not get user todo by user id");
    throw err;
  }
}

module.exports = {
  createUserTodo,
  getAllUserTodos,
  getUserTodosById,
  getUserTodosByUserId,
  updateUserTodo
};
