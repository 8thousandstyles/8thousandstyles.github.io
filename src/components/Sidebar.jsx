import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
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
        <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          /etc/network
        </NavLink>
      </div>

      <div className="nav-section" style={{ marginTop: 'auto' }}>
        <span className="nav-header">Network</span>
        <a href="https://github.com" target="_blank" rel="noreferrer" className="nav-link">GitHub</a>
        <a href="https://scholar.google.com" target="_blank" rel="noreferrer" className="nav-link">Publications</a>
      </div>
    </nav>
  );
};

export default Sidebar;
