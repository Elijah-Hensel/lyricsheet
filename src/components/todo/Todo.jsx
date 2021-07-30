import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TodoRadio from "../todo_radio/TodoRadio";
import "./Todo.css";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    minWidth: "92%",
    maxWidth: 275,
    boxShadow: "none",
    padding: "0 .5rem",
  },
  moreIcon: {
    alignContent: "end",
  },
});

export default function Todo({ todo, todos }) {
  const classes = useStyles();
  const [active, setActive] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMore1 = (event) => {
    try {
      event.preventDefault();
      console.log("CLICK!");
    } catch (error) {
      throw error;
    }
  };
  return (
    <>
      {todos && (
        <Card className={classes.root}>
          <CardContent className="todo-content">
          <TodoRadio
              todo={todo}
              todos={todos}
              active={active}
              setActive={setActive}
            />
            <Typography
              className={todo.active ? "todo-text" : "todo-inactive"}
              color="textPrimary"
            >              {todo.content}
            </Typography>
            <div className="more-icon-div">
              <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <MoreHorizIcon
                  style={{ fontSize: "small", float: "right"}}
                  className="more-icon"
                />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose} style={{ fontSize: "small" }}>Edit</MenuItem>
                <MenuItem onClick={handleClose} style={{ fontSize: "small" }}>Delete</MenuItem>
                <MenuItem onClick={handleClose} style={{ fontSize: "small" }}>Archive</MenuItem>

              </Menu>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
