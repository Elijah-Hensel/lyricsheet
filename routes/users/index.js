require("dotenv").config();
const express = require("express");
const usersRouter = express.Router();
const { getAllUsers, getUserById, getUserByEmail } = require("../../db/users");


// // Import, then initiate Magic instance for server-side methods
// const { Magic } = require("@magic-sdk/admin");
// const magic = new Magic(process.env.MAGIC_SECRET_KEY);

// // Route to validate the user's DID token
// usersRouter.post("/login", async (req, res) => {
//   try {
//     const didToken = req.headers.authorization.substr(7);
//     await magic.token.validate(didToken);
//     res.status(200).json({ authenticated: true });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();

    res.send({
      message: "All Users Grabbed",
      users,
    });
  } catch ({ name, message }) {
    next({ name: "GetAllUsersError", message: "Unable to get all users!" });
  }
});

usersRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    res.send({
      message: `User With Id '${id}' Grabbed`,
      user,
    });
  } catch ({ name, message }) {
    next({
      name: "GetUserByIdError",
      message: "Unable to get user with that id",
    });
  }
});

<<<<<<< HEAD
usersRouter.get("/email/:email", async (req, res, next) => {
  try {
    const { email } = req.params;
    const user = await getUserByEmail(email);
    res.send({
      message: `User With email '${email}' Grabbed`,
      user,
    });
  } catch ({ name, message }) {
    next({
      name: "GetUserByEmailError",
      message: "Unable to get user with that email",
    });
  }
});
=======

>>>>>>> main
module.exports = usersRouter;
