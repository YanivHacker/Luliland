import './App.css';
import {Routes, Route, BrowserRouter} from 'react-router-dom';

import Home from './pages/home/Home';
import {SignUp} from "./components/SignUp/SignUp";
import Profile from "./pages/profile/Profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/*<Route path="/login" element={<Login />} />*/}
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
