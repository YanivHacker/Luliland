import './App.css';
import {Routes, Route, BrowserRouter} from 'react-router-dom';

import Login from './components/Login';
import Home from './pages/Home';
import {SignUp} from "./components/SignUp/SignUp";
import Chat from "./pages/Chat";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
