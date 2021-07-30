const { client } = require("../index");
const { joinNotesOnNotesCategory } = require("../notes_categories");

async function createUser({ email }) {
  try {
    const {
      rows: [users],
    } = await client.query(
      `
        INSERT INTO users(email)
        VALUES($1)
        RETURNING *;
      `,
      [email]
    );
    return users;
  } catch (err) {
    console.error("Could not createUser!");
    throw err;
  }
}

async function addUserInfo(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [user],
    } = await client.query(
      `
      UPDATE users
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
    `,
      Object.values(fields)
    );

    return user;
  } catch (err) {
    console.error("Could not add user info!");
    throw err;
  }
}

async function getAllUsers() {
  try {
    const { rows: id } = await client.query(`
    SELECT id 
    FROM users;
  `);

    const users = await Promise.all(id.map((user) => getUserById(user.id)));
    return users;
  } catch (err) {
    throw err;
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT *
      FROM users
      WHERE id=$1;
    `,
      [userId]
    );

    if (!user) {
      throw {
        name: "UserNotFoundError",
        message: "Could not find a User with that user_id",
      };
    }

    delete user.password;

    await joinNotesNoCatToUser(userId, user);
    await joinTodosToUser(userId, user);
    await joinNotesCategoriesToUser(userId, user);

    return user;
  } catch (error) {
    throw error;
  }
}

async function joinNotesNoCatToUser(userId, user) {
  try {
    const { rows: notes_no_cat } = await client.query(
      `
    SELECT notes_no_cat.*
    FROM notes_no_cat
    INNER JOIN users ON users.id = notes_no_cat.id
    WHERE notes_no_cat.user_id = $1
  `,
      [userId]
    );

    if (notes_no_cat) {
      user.notes_no_cat = notes_no_cat;
    }
  } catch (err) {
    throw err;
  }
}

async function joinTodosToUser(userId, user) {
  try {
    const { rows: todos } = await client.query(
      `
    SELECT user_todos.*
    FROM user_todos
    INNER JOIN users ON users.id = user_todos.id
    WHERE user_todos.user_id = $1
  `,
      [userId]
    );

    if (todos) {
      user.todos = todos;
    }
  } catch (err) {
    throw err;
  }
}

async function joinNotesCategoriesToUser(userId, user) {
  try {
    const { rows: categories } = await client.query(
      `
    SELECT notes_categories.*
    FROM notes_categories
    INNER JOIN users ON users.id = notes_categories.id
    WHERE notes_categories.user_id = $1
  `,
      [userId]
    );

    console.log(categories);

    if (categories) {
      user.notes_categories = categories[0];
    }
  } catch (err) {
    throw err;
  }
}

async function getUserByEmail(email) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT *
      FROM users
      WHERE users.email = $1
      `,
      [email]
    );

    if (user) {
      return user;
    } else {
      const newUser = await createUser({ email });
      return newUser;
    }
  } catch (err) {
    console.error("Could not get user by email");
    throw err;
  }
}

async function getUserByUsername(username) {}

async function verifyUniqueUser(username, email) {}

module.exports = {
  createUser,
  addUserInfo,
  getAllUsers,
  getUserById,
  getUserByEmail,
};
