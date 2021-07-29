import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TodoRadio from "../todo_radio/TodoRadio";
import "./Todo.css";

const useStyles = makeStyles({
  root: {
    minWidth: "92%",
    maxWidth: 275,
    boxShadow: "none",
    padding: "0 .5rem",
  },
});

export default function Todo({ todo, todos }) {
  const classes = useStyles();
  const [active, setActive] = useState(true);
  return (
    <>
      {todos && (
        <Card className={classes.root}>
          <CardContent className="todo-content">
            <TodoRadio todo={todo} todos={todos} active={active} setActive={setActive} />
            <Typography className={todo.active ? "todo-text" : "todo-inactive"} color="textPrimary">
              {todo.content}
            </Typography>
          </CardContent>
        </Card>
      )}
    </>
  );
}
