import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Home } from './Pages/Home';
import { Articles } from './Pages/Articles';
import { About } from './Pages/About';

export default function App() {
  return (
    <>
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
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/articles" element={<Articles />} />
      </Routes>
    </>
  );
}
