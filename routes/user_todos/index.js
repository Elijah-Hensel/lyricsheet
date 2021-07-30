require("dotenv").config();
const express = require("express");
const {
  getAllUserTodos,
  getUserTodosById,
  getUserTodosByUserId,
  createUserTodo,
  updateUserTodo,
} = require("../../db/user_todos");
const userTodosRouter = express.Router();

userTodosRouter.get("/", async (req, res, next) => {
  try {
    const todos = await getAllUserTodos();

    res.send({
      message: "All User Todos Grabbed",
      todos,
    });
  } catch ({ name, message }) {
    next({
      name: "GetAllUserTodosError",
      message: "Unable to get all User Todos!",
    });
  }
});

userTodosRouter.post("/", async (req, res, next) => {
  const { user_id, content, active } = req.body;
  const todoData = {};

  try {
    todoData.user_id = user_id;
    todoData.content = content;
    todoData.active = active;

    if (!content) {
      res.send(next(console.error({ message: "Cannot submit empty todo" })));
    }

    const newTodo = await createUserTodo(todoData);
    res.send({
      message: "Todo successfully created!",
      newTodo,
    });
  } catch ({ name, message }) {
    next({
      name: "TodoCreateError",
      message: "Unable to create Todo",
    });
  }
});

userTodosRouter.patch(":/id", async (req, res, next) => {
  const { id } = req.params;
  const { content } = req.body;

  const updateFields = {};
  if (content) {
    updateFields.content = content;
  }

  try {
    const updatedTodo = await updateUserTodo(todo.id, updateFields);
    res.send({ updatedTodo });
  } catch ({ name, message }) {
    next({ name: "TodoUpdateError", message: "Unable to update todo info" });
    console.error(message);
  }
});

userTodosRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getUserTodosById(id);
    res.send(data);
  } catch ({ name, message }) {
    next({
      name: "GetNotesNoCatByIdError",
      message: "Unable to get note by id!",
    });
  }
});

userTodosRouter.get("/user/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getUserTodosByUserId(id);
    res.send(data);
  } catch ({ name, message }) {
    next({
      name: "GetTodosByUserIdError",
      message: "Unable to get todos by user id!",
    });
  }
});

userTodosRouter.get("/user/:id/active", async (req, res, next) => {
  try {
    const { id } = req.params;
    const todos = await getUserTodosByUserId(id);
    const activeTodos = [...todos].filter((todo) => todo.active);

    res.send(activeTodos);
  } catch ({ name, message }) {
    next({
      name: "GetActiveTodosByUserIdError",
      message: "Unable to get active todos by user id!",
    });
  }
});

userTodosRouter.get("/user/:id/inactive", async (req, res, next) => {
  try {
    const { id } = req.params;
    const todos = await getUserTodosByUserId(id);
    const inactiveTodos = [...todos].filter((todo) => !todo.active);

    res.send(inactiveTodos);
  } catch ({ name, message }) {
    next({
      name: "GetInactiveTodosByUserIdError",
      message: "Unable to get inactive todos by user id!",
    });
  }
});

module.exports = userTodosRouter;
