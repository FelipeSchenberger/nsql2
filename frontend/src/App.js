
import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Lugares from './pages/Lugares';
import AgregarLugar from './pages/AgregarLugar';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lugares" element={<Lugares />} />
            <Route path="/agregar-lugar" element={<AgregarLugar />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;