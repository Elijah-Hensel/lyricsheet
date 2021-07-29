import React, { useState, useEffect } from "react";
import Todo from "../todo/Todo";
import { Button } from "@material-ui/core";
import CreateTwoToneIcon from "@material-ui/icons/CreateTwoTone";
import "./TodoList.css";
import TodoForm from "../todo/TodoForm";
import { grabAllUserTodos } from "../../api/user_todos";

export default function TodoList({todos, setTodos}) {
  //const [todoList, setToDoList] = useState([]);

  return (
    <div className="todo-list-container">
      <div className="todo-list-header">
        <span>I Need To Do...</span>
        <Button className="create-todo-btn">
          <CreateTwoToneIcon className="create-todo-icon" />
        </Button>
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
