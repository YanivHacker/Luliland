import './App.css';
import {Routes, Route, BrowserRouter} from 'react-router-dom';

import Home from './pages/Home/Home';
import {SignUp} from "./components/SignUp/SignUp";
import Profile from "./pages/Profile/Profile";
import Messenger from "./pages/Messenger/Messenger";
import { AuthContext } from "./context/AuthContext";
import {useContext} from "react";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/profile/:userEmail" element={<Profile />} />
          <Route path="/messenger" element={<Messenger/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
