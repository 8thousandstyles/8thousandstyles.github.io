import React from 'react';
import { NavLink } from 'react-router-dom';
import { Terminal, Cpu, Network } from 'lucide-react';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <Terminal size={24} color="var(--accent-cyan)" />
        <span style={styles.logoText}>SYS_INIT</span>
      </div>
      <ul style={styles.navLinks}>
        <li>
          <NavLink 
            to="/" 
            style={({ isActive }) => isActive ? {...styles.link, ...styles.activeLink} : styles.link}
            end
          >
            <span className="mono-text">[ ~/home ]</span>
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/projects" 
            style={({ isActive }) => isActive ? {...styles.link, ...styles.activeLink} : styles.link}
          >
            <span className="mono-text">[ /bin/projects ]</span>
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/algorithms" 
            style={({ isActive }) => isActive ? {...styles.link, ...styles.activeLink} : styles.link}
          >
            <span className="mono-text">[ /sys/algorithms ]</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    position: 'fixed',
    top: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem 3rem',
    background: 'rgba(5, 5, 16, 0.8)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(0, 243, 255, 0.1)',
    zIndex: 1000,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  logoText: {
    fontFamily: 'var(--font-mono)',
    fontWeight: '700',
    fontSize: '1.2rem',
    color: 'var(--text-primary)',
    letterSpacing: '2px',
  },
  navLinks: {
    display: 'flex',
    listStyle: 'none',
    gap: '2rem',
  },
  link: {
    textDecoration: 'none',
    color: 'var(--text-secondary)',
    transition: 'all 0.3s ease',
    fontSize: '0.9rem',
  },
  activeLink: {
    color: 'var(--accent-cyan)',
    textShadow: 'var(--neon-glow-cyan)',
  }
};

export default Navbar;
