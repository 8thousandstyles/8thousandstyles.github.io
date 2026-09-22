import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(t => t === 'dark' ? 'light' : 'dark');
  };

  return (
    <nav className="sidebar">
      <div>
        <h2 className="mono" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
          SYS_ARCHITECT
        </h2>
        <p className="text-dim" style={{ fontSize: '0.85rem' }}>
          High-Performance Computing<br/>
          Systems Engineering
        </p>
      </div>

      <div className="nav-section">
        <span className="nav-header">Execution Context</span>
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} end>
          /sys/benchmark (Home)
        </NavLink>
        <NavLink to="/projects" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          /bin/projects
        </NavLink>
        <NavLink to="/algorithms" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          /lib/algorithms
        </NavLink>
        <NavLink to="/resume" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          /etc/profile (Resume)
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          /etc/network
        </NavLink>
      </div>

      <div className="nav-section" style={{ marginTop: 'auto' }}>
        <button onClick={toggleTheme} style={{ width: '100%', marginBottom: '1rem', textAlign: 'left' }}>
          [ Toggle {theme === 'dark' ? 'Light' : 'Dark'} Mode ]
        </button>
        <span className="nav-header">Network</span>
        <a href="https://github.com" target="_blank" rel="noreferrer" className="nav-link">GitHub</a>
        <a href="https://scholar.google.com" target="_blank" rel="noreferrer" className="nav-link">Publications</a>
      </div>
    </nav>
  );
};

export default Sidebar;
