import './App.css';
import {Routes, Route, BrowserRouter} from 'react-router-dom';

import Home from './pages/Home/Home';
import {SignUp} from "./components/SignUp/SignUp";
import Profile from "./pages/profile/Profile";
import Messenger from "./pages/Messenger/Messenger";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/messenger" element={<Messenger/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
