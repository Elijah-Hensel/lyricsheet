import React, { useState, useEffect } from "react";
import Todo from "../todo/Todo";
import { Button } from "@material-ui/core";
import CreateTwoToneIcon from "@material-ui/icons/CreateTwoTone";
import "./TodoList.css";
import TodoForm from "../todo/TodoForm";
import AddIcon from "@material-ui/icons/Add";

import { grabAllUserTodos } from "../../api/user_todos";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";


export default function TodoList({todos, setTodos}) {
  //const [todoList, setToDoList] = useState([]);
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
    <div className="todo-list-container">
      <div className="todo-list-headers">
        <span>I Need To Do...</span>
        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreHorizIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Clear the day</MenuItem>
          <MenuItem onClick={handleClose}>Clear completed tasks</MenuItem>
          <MenuItem onClick={handleClose}>Done (5)</MenuItem>
        </Menu>
      </div>
      <div className="todo-list">
        <TodoForm todos={todos} setTodos={setTodos} />
        {todos.map((todo, idx) => {
          return <Todo key={idx} todos={todos} todo={todo} setTodos={setTodos}/>;
          })}
      </div>
    </div>
  );
}
