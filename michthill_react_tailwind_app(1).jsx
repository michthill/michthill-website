import React, { useState } from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";

const LOGO_URL = "https://www.michthill.com/logo.png";
const ACCENT_GREEN = "#1f7a4c";

function Header() {
  return (
    <header className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={LOGO_URL} alt="Logo" className="h-12 w-auto" />
          <div>
            <h1 className="text-lg font-semibold">Michel Thill</h1>
            <p className="text-xs text-gray-600">Senior Program Officer — swisspeace</p>
          </div>
        </div>

        <nav>
          <ul className="flex gap-6 items-center text-sm">
            <li><Link to="/" className="hover:underline">Portfolio</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="/publications" className="hover:underline">Publications</Link></li>
            <li><Link to="/contact" className="px-3 py-2 rounded-md" style={{ background: ACCENT_GREEN, color: '#fff' }}>Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

function Portfolio() {
  const portfolio = [
    { title: "Project / Report Title 1", year: "2023", desc: "Short description.", link: "#" },
    { title: "Project / Report Title 2", year: "2021", desc: "Short description.", link: "#" },
  ];

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-semibold">Portfolio</h2>
      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolio.map((p, i) => (
          <article key={i} className="bg-white rounded-lg p-5 shadow-sm hover:shadow-md transition">
            <div className="flex items-baseline justify-between gap-3">
              <h4 className="font-semibold">{p.title}</h4>
              <span className="text-xs text-gray-500">{p.year}</span>
            </div>
            <p className="mt-3 text-sm text-gray-700">{p.desc}</p>
            <a href={p.link} className="mt-4 inline-block text-sm underline">Read more</a>
          </article>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="mt-8 bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-2xl font-semibold">About</h2>
      <p className="mt-4 text-gray-700">Michel Thill is a researcher and practitioner working on conflict, governance and civil society in the Great Lakes. He holds a PhD in Political Science and has worked as an independent consultant and programme manager across the region.</p>
      <p className="mt-4 text-gray-700">Past roles include work with the Rift Valley Institute and multiple consultancies. He publishes research and policy analysis on policing, civic space, urban violence, DDR and security sector reform.</p>
    </section>
  );
}

function Publications() {
  const publications = [
    { title: "Publication Title 1", outlet: "Journal / Publisher", year: "2022", link: "#" },
    { title: "Policy Brief Title 2", outlet: "Organization", year: "2019", link: "#" },
  ];

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-semibold">Publications</h2>
      <ul className="mt-6 space-y-4">
        {publications.map((pub, i) => (
          <li key={i} className="bg-white rounded-lg p-4 shadow-sm flex justify-between items-start">
            <div>
              <a href={pub.link} className="font-medium hover:underline">{pub.title}</a>
              <div className="text-sm text-gray-600">{pub.outlet} • {pub.year}</div>
            </div>
            <a href={pub.link} className="text-sm underline">PDF</a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Contact() {
  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  function handleChange(e) { setContact({ ...contact, [e.target.name]: e.target.value }); }
  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/your-form-id", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      if (res.ok) {
        setStatus("sent"); setContact({ name: "", email: "", message: "" });
      } else setStatus("error");
    } catch { setStatus("error"); }
  }

  return (
    <section className="mt-8 bg-white rounded-lg p-6 shadow-sm">
      <h2 className="text-2xl font-semibold">Contact</h2>
      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 max-w-xl">
        <input name="name" placeholder="Name" value={contact.name} onChange={handleChange} className="p-2 border rounded" required />
        <input name="email" type="email" placeholder="Email" value={contact.email} onChange={handleChange} className="p-2 border rounded" required />
        <textarea name="message" placeholder="Message" rows={5} value={contact.message} onChange={handleChange} className="p-2 border rounded" required />
        <button type="submit" className="px-4 py-2 rounded" style={{ background: ACCENT_GREEN, color: '#fff' }}>{status === "sending" ? "Sending…" : "Send"}</button>
        {status === "sent" && <span className="text-green-700">Message sent!</span>}
        {status === "error" && <span className="text-red-600">Error sending message.</span>}
      </form>
    </section>
  );
}

export default function MichThillSite() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Header />
        <main className="max-w-6xl mx-auto px-6 py-12">
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <footer className="mt-16 text-center text-sm text-gray-500">© {new Date().getFullYear()} Michel Thill</footer>
      </div>
    </Router>
  );
}
