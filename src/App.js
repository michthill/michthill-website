import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Header() {
  return (
    <header style={{ padding:'1rem', background:'#fff', borderBottom:'1px solid #ddd' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <div>
          <img src="https://www.michthill.com/logo.png" alt="Logo" style={{ height:'50px' }} />
        </div>
        <nav>
          <Link to="/" style={{ marginRight:'1rem' }}>Portfolio</Link>
          <Link to="/about" style={{ marginRight:'1rem' }}>About</Link>
          <Link to="/publications" style={{ marginRight:'1rem' }}>Publications</Link>
          <Link to="/contact" style={{ background:'#1f7a4c', color:'#fff', padding:'0.5rem', borderRadius:'0.25rem' }}>Contact</Link>
        </nav>
      </div>
    </header>
  );
}

function Portfolio() { return <section><h2>Portfolio</h2></section>; }
function About() { return <section><h2>About</h2></section>; }
function Publications() { return <section><h2>Publications</h2></section>; }
function Contact() { return <section><h2>Contact</h2></section>; }

export default function App() {
  return (
    <Router>
      <Header />
      <main style={{ padding:'2rem' }}>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </Router>
  );
}