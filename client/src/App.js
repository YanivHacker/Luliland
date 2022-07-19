import './App.css';
import {Routes, Route, BrowserRouter, Redirect} from 'react-router-dom';

import Home from './pages/Home/Home';
import { SignUp } from "./components/SignUp/SignUp";
import Profile from "./pages/Profile/Profile";
import Messenger from "./pages/Messenger/Messenger";
import {useContext, useState} from "react";
import Login from "./components/Login/Login";
import {Navigate} from 'react-router-dom';
import {sendMessage} from "./services/MessageService";
import {getUserByEmail} from "./services/UserService";
import EditUser from "./pages/EditUser/EditUser";
import {getCurrentUser} from "./Utils/currentUser";

function App() {
  //const userEmail = localStorage.getItem("email");
  //const password = localStorage.getItem("password");
  //console.log("email " + userEmail)
  //const [user, setUser] = useState([]);
  // if(userEmail) {
  //   const getUser = async () => {
  //     const user = await getUserByEmail(userEmail);
  //     setUser(user)
  //   }
  //   getUser();
  // }
  //console.log(password)
  const user = getCurrentUser();
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={user ? <Home /> : <SignUp />}>
          </Route>
          <Route path="/login" element={<Login />}>
          </Route>
          <Route path="/register" element={user ? <Navigate to="/" /> : <SignUp />}>
          </Route>
          <Route path="/logout" element={<Login />}>
          </Route>
          <Route path="/updateUser" element={<EditUser/>}>
          </Route>
          {/*<Route exact path="/" element={<Register/>} />*/}
          {/*<Route exact path="/login" element={<Login />} />*/}
          {/*<Route path="/profile/:userEmail" element={<Profile />} />*/}
          {/*<Route path="/messenger" element={<Messenger/>}/>*/}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
