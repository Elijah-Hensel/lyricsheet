import React, { useState } from "react";
import { createTodo } from "../../api/user_todos";
import { Button, Modal, TextField } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const TodoForm = ({ todos, setTodos }) => {
  const [content, setContent] = useState("");
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleCreateTodo = async (event) => {
    try {
      event.preventDefault();
      const { newTodo } = await createTodo(content);
      setTodos((prevTodos) => {
        return [...prevTodos, newTodo];
      });
      setContent("");
      setOpen(false);
    } catch (error) {
      throw error;
    }
  };
  const handleAddTodoOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={handleAddTodoOpen}>
        <AddIcon />
      </IconButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
        <div className={classes.paper}>
          <form noValidate autoComplete="off" onSubmit={handleCreateTodo}>
            <TextField
              type="text"
              label="content"
              placeholder="content"
              fullWidth
              value={content}
              onInput={(event) => {
                setContent(event.target.value);
              }}
            />
            <Button type="submit">Submit</Button>
          </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default TodoForm;
