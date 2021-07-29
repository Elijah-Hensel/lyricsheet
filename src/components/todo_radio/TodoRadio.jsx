import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Radio from "@material-ui/core/Radio";

const GreenRadio = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

export default function TodoRadio({todo, todos, active, setActive}) {
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleChange = (id) => {
    // const todo = todos.find((todo) => todo.id === id);
    // todo.active = !todo.active;
    // setActive(false)
    // return [...todos]
  };

  return (
    <div>
      <GreenRadio
        checked={!todo.active} 
        onChange={handleChange}
        value="complete"
        name="radio-button-demo"
        inputProps={{ "aria-label": "complete" }}
      />
    </div>
  );
}
