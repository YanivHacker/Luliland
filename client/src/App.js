import './App.css';
import {Routes, Route, BrowserRouter} from 'react-router-dom';

import Login from './components/Login';
import Home from './pages/Home';
import {SignUp} from "./components/sign-up/SignUp";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
