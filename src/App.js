import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Home } from './Pages/Home';
import { Articles } from './Pages/Articles';
import { About } from './Pages/About';
import './style.css';

export default function App() {
  return (
    <BrowserRouter>
      <h1>SSR Example</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/articles">Articles</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/articles" element={<Articles />} />
      </Routes>
    </BrowserRouter>
  );
}
