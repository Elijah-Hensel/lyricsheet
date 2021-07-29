import React, { useState } from "react";
import { createTodo } from "../../api/user_todos";
import { Button, Modal, TextField } from "@material-ui/core/";

const TodoForm = ({todos, setTodos}) => {
    const [content, setContent] = useState("");
    const handleCreateTodo = async (event) => {
        try {
            event.preventDefault();
            const { newTodo } = await createTodo(
                content
            );
            setTodos((prevTodos) => {
                return [...prevTodos, newTodo];
            });
            setContent("")
        } catch (error) {
            throw error;
        }
    }

    return <>
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
    </>;
};

export default TodoForm;
