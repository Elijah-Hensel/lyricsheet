const express = require("express");
const notesNoCatRouter = express.Router();
const {
  getAllNotesNoCat,
  getNotesNoCatById,
  getNotesNoCatByUserId,
} = require("../../db/notes_no_cat");

notesNoCatRouter.get("/", async (req, res, next) => {
  try {
    const notes = await getAllNotesNoCat();

    res.send({
      message: "All Notes Without A Category Grabbed",
      notes,
    });
  } catch ({ name, message }) {
    next({
      name: "GetAllNotesNoCatError",
      message: "Unable to get all notes without a category!",
    });
  }
});

notesNoCatRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getNotesNoCatById(id);
    res.send(data);
  } catch ({ name, message }) {
    next({
      name: "GetNotesNoCatByIdError",
      message: "Unable to get note by id!",
    });
  }
});

notesNoCatRouter.get("/user/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getNotesNoCatByUserId(id);
    res.send(data);
  } catch ({ name, message }) {
    next({
      name: "GetNotesNoCatByIdError",
      message: "Unable to get note by user id!",
    });
  }
});

module.exports = notesNoCatRouter;
