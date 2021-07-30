import "./App.css";
import React, { useState, useEffect } from "react";
import {
  Switch,
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { UserContext } from "./context/userContext";
import { checkUser } from "./service/magic";
import Authenticate from "./components/Authenticate";
import Dashboard from "./components/DashBoard";
import PrivateRoute from "./components/PrivateRoute";
import Landing from "./components/landing/Landing";
import NavBar from "./components/NavBar/NavBar";
import Main from "./components/Main/Main";
import Header from "./components/header/Header";
import NoteAside from "./components/note_aside/NoteAside";
import Note from "./components/note/Note";
import Utility from "./components/utility/Utility";
import { grabAllUsers, grabUserByEmail } from "./api";
import { grabAllNotesNoCat } from "./api";
import { grabAllUserTodos } from "./api/user_todos";

function App() {
  const [authUser, setAuthUser] = useState(true);
  const [utilityIsOpen, setUtilityIsOpen] = useState(false);
  const [todoActive, setTodoActive] = useState(false);
  const [lookUpActive, setLookUpActive] = useState(false);
  const [grabbedUsers, setGrabbedUsers] = useState("");
  const [grabbedNotesNoCat, setGrabbedNotesNoCat] = useState("");
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState({ isLoggedIn: null, email: "" });
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState();

  async function getAllGrabbedNotesNoCat() {
    try {
      const notes = await grabAllNotesNoCat();
      setGrabbedNotesNoCat(notes);
    } catch (err) {
      console.error("getAllGrabbedNotesNoCatError");
      throw err;
    }
  }

  async function getAllGrabbedUsers() {
    try {
      const users = await grabAllUsers();
      setGrabbedUsers(users);
    } catch (err) {
      console.error("getAllGrabbedUsersError");
      throw err;
    }
  }

  async function createNewUserAfterSignUp(user) {
    try {
      if (currentUser.length > 1) {
        return;
      }

      if (user.email) {
        const userWithInfo = await grabUserByEmail(user.email);
        console.log(userWithInfo, "USER WITH INFO");
        setCurrentUser("USERWITHINFO");
        console.log(currentUser, "CURRENT USER");
      }
    } catch (err) {
      console.error("COULD NOT CREATE NEW USER AFTER SIGN UP");
      throw err;
    }
  }

  useEffect(() => {
    getAllGrabbedNotesNoCat();
    getAllGrabbedUsers();
  }, [setGrabbedNotesNoCat]);

  useEffect(() => {
    grabAllUserTodos()
      .then(({ todos }) => {
        setTodos(todos);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    const validateUser = async () => {
      setLoading(true);
      try {
        await checkUser(setUser);
        setLoading(false);
        console.log(user, "MAGIC USER");
        await createNewUserAfterSignUp(user);

        console.log(currentUser, "CURRENT USER");
      } catch (error) {
        console.error(error);
      }
    };
    validateUser();
  }, [user.isLoggedIn]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <UserContext.Provider value={user}>
      <Router>
        {user.isLoggedIn && <Redirect to={{ pathname: "/dashboard" }} />}
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Authenticate} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
      {/* <div className="App">
          <Header
            todoActive={todoActive}
            setTodoActive={setTodoActive}
            lookUpActive={lookUpActive}
            setLookUpActive={setLookUpActive}
            utilityIsOpen={utilityIsOpen}
            setUtilityIsOpen={setUtilityIsOpen}
          />
          <div className="main-note-container">
            <NoteAside grabbedNotesNoCat={grabbedNotesNoCat} />
            <Note />
            <Utility
              todoActive={todoActive}
              setTodoActive={setTodoActive}
              lookUpActive={lookUpActive}
              setLookUpActive={setLookUpActive}
              utilityIsOpen={utilityIsOpen}
              setUtilityIsOpen={setUtilityIsOpen}
              todos={todos}
              setTodos={setTodos}
            />
          </div></div> */}
    </UserContext.Provider>
  );
}

export default App;
