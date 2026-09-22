import React, { useState } from 'react';

const ContactView = () => {
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('processing');
    setTimeout(() => setStatus('success'), 800);
  };

  return (
    <div>
      <h1 className="mono">/etc/network</h1>
      <p className="text-dim mb-8">
        Secure communication endpoints for collaboration, employment inquiries, and technical discussions.
      </p>

      <div className="card mb-8">
        <h2 className="mono" style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--accent)' }}>
          POST /api/v1/handshake
        </h2>
        <p className="text-dim mb-4" style={{ fontSize: '0.9rem' }}>
          Initialize a secure connection by submitting the payload below. The system will respond with a 200 OK and initiate a reply sequence.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label className="mono text-dim" style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem' }}>"reply_to": &lt;String&gt;</label>
            <input 
              type="email" 
              required 
              placeholder="user@domain.com"
              style={{ width: '100%', padding: '0.8rem', background: 'transparent', border: '1px solid var(--border)', color: 'var(--fg)', fontFamily: 'var(--font-mono)' }}
            />
          </div>
          <div>
            <label className="mono text-dim" style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem' }}>"payload": &lt;String&gt;</label>
            <textarea 
              required 
              rows="5"
              placeholder="Enter message body here..."
              style={{ width: '100%', padding: '0.8rem', background: 'transparent', border: '1px solid var(--border)', color: 'var(--fg)', fontFamily: 'var(--font-mono)', resize: 'vertical' }}
            />
          </div>
          
          <div>
            <button type="submit" disabled={status !== 'idle'} style={{ width: '100%' }}>
              {status === 'idle' && 'Execute Request'}
              {status === 'processing' && 'Transmitting...'}
              {status === 'success' && '200 OK: Handshake Accepted'}
            </button>
          </div>
        </form>
      </div>

      <div className="card">
        <h2 className="mono" style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>
          Authorized Endpoints
        </h2>
        <ul className="mono text-dim" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem' }}>
          <li>
            <span style={{ color: 'var(--fg)', display: 'inline-block', width: '100px' }}>EMAIL:</span>
            <a href="mailto:alex@sysarchitect.dev" style={{ color: 'var(--accent)' }}>alex@sysarchitect.dev</a>
          </li>
          <li>
            <span style={{ color: 'var(--fg)', display: 'inline-block', width: '100px' }}>GITHUB:</span>
            <a href="https://github.com/sysarchitect" target="_blank" rel="noreferrer">github.com/sysarchitect</a>
          </li>
          <li>
            <span style={{ color: 'var(--fg)', display: 'inline-block', width: '100px' }}>LINKEDIN:</span>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">linkedin.com/in/sysarchitect</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContactView;
