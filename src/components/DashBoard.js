import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { UserContext } from "../context/userContext";
import { logoutUser } from "../service/magic";
import NoteAside from "./note_aside/NoteAside";
import Note from "./note/Note";
import Header from "./header/Header";
import Utility from "./utility/Utility";

const Dashboard = () => {
  const { email } = useContext(UserContext);
  const history = useHistory();
  const handleLogOut = async () => {
    try {
      await logoutUser();
      history.replace("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
      <div className="p-2">
        <div className="d-flex justify-content-end">
          <Button variant="primary" onClick={handleLogOut}>
            Sign Out
          </Button>
        </div>
        <h1 className="h1">User: {email}</h1>
      </div>
  );
};
export default Dashboard;
