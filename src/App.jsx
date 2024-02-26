import './App.css';
import UserProfile from './comps/UserProfile';
import Home from './comps/home';
import Login from './comps/login';
import Register from './comps/register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userprofile" element={<UserProfile />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
