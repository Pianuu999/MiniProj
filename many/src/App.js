import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/login';
import Register from './pages/Register';
import List from './pages/List';
import ForgotPassword from './pages/forgotPassword';
import Memory from './memorytest/memory.tsx';
import Game from './potato-eat/game.js';
import Market from './market/Market';
import Cart from './market/Cart';
import Chatapp from './chat/chat_app';
import Todoo from './todolist/Todo';
import firebase from './firebase';

function App() {
  const location = useLocation();

  return (
      <div className="App">
      {location.pathname === '/List' && <Navbar />}
      {location.pathname === '/memorytest' && <Navbar />}
      {location.pathname === '/potato-eat' && <Navbar />}
      {location.pathname === '/Market' && <Navbar />}
      {location.pathname === '/Cart' && <Navbar />}
      {location.pathname === '/chat' && <Navbar />}
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Forgotpassword" element={<ForgotPassword />} />
        <Route path="/List" element={<List />} />
        <Route path="/memory-test" element={<Memory />} />
        <Route path="/potato-eat" element={<Game />} />
        <Route path="/Market" element={<Market />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/chat" element={<Chatapp />} />
        <Route path="/Todo" element={<Todoo />} />
        </Routes>
      </div>
  );
}

export default function RootApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
