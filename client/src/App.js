import './App.css';
import {Routes, Route, BrowserRouter} from 'react-router-dom';

import Home from './pages/Home/Home';
import {SignUp} from "./components/SignUp/SignUp";
import Profile from "./pages/Profile/Profile";
import Login from "./components/Login/Login"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
