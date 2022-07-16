import './App.css';
import {Routes, Route, BrowserRouter, Redirect} from 'react-router-dom';

import Home from './pages/Home/Home';
import { SignUp } from "./components/SignUp/SignUp";
import Profile from "./pages/Profile/Profile";
import Messenger from "./pages/Messenger/Messenger";
import { AuthContext } from "./context/AuthContext";
import {useContext} from "react";
import Login from "./pages/Login/Login";
// import Login from "./components/Login/Login";
import Register from "./pages/Register/Register";
import {Navigate} from 'react-router-dom';

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={user ? <Home /> : <Register />}>
          </Route>
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />}>
          </Route>
          <Route path="/register" element={user ? <Navigate to="/" /> : <Register />}>
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
