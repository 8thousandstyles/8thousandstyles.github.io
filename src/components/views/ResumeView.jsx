import React from 'react';

const resumeData = {
  "name": "Alex Chen",
  "title": "Systems Architect & HPC Researcher",
  "contact": {
    "email": "alex@sysarchitect.dev",
    "github": "github.com/sysarchitect"
  },
  "education": {
    "university": "Stanford University",
    "degree": "M.S. Computer Science",
    "focus": ["Systems", "Theoretical CS"]
  },
  "experience": [
    {
      "company": "Deep Compute",
      "role": "Distributed Systems Engineer",
      "years": "2023 - Present",
      "impact": "Architected a custom RAFT consensus layer for a 10,000-node GPU cluster. Reduced P99 tail latency by 45% using io_uring."
    },
    {
      "company": "Quant Research",
      "role": "HPC Developer",
      "years": "2020 - 2023",
      "impact": "Wrote heavily vectorized AVX-512 pricing kernels in C. Squeezed microsecond latencies out of order-book matching algorithms."
    }
  ],
  "skills": ["C/C++20", "Rust", "CUDA", "MPI", "Linux Kernel", "Assembly"]
};

const ResumeView = () => {
  return (
    <div>
      <div className="flex" style={{ justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
        <div>
          <h1 className="mono" style={{ margin: 0 }}>/etc/profile</h1>
          <p className="text-dim mt-2">Curriculum Vitae data source.</p>
        </div>
        <div className="flex gap-2">
          <button id="btn-raw-view" className="active" type="button">RAW JSON</button>
          <button id="btn-compiled-view" type="button">COMPILED HTML</button>
        </div>
      </div>

      <div id="panel-raw-view">
        <pre className="mono" style={{ 
          background: 'var(--bg)', 
          border: '1px solid var(--border)', 
          padding: '2rem', 
          color: 'var(--fg)',
          fontSize: '0.9rem',
          overflowX: 'auto'
        }}>
          {JSON.stringify(resumeData, null, 2)}
        </pre>
      </div>

      <div id="panel-compiled-view" style={{ display: 'none' }}>
        <div className="card" style={{ background: 'var(--bg)' }}>
          <h1 style={{ borderBottom: '2px solid var(--border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
            {resumeData.name} <span className="text-dim" style={{ fontWeight: 'normal', fontSize: '1.2rem' }}>| {resumeData.title}</span>
          </h1>
          
          <div className="flex gap-4 mb-8">
            <span className="mono badge">{resumeData.contact.email}</span>
            <span className="mono badge">{resumeData.contact.github}</span>
          </div>

          <h3 className="mono mb-4 text-dim">EXPERIENCE</h3>
          <div className="flex" style={{ flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
            {resumeData.experience.map((exp, i) => (
              <div key={i}>
                <div className="flex" style={{ justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h4 style={{ margin: 0 }}>{exp.company} — {exp.role}</h4>
                  <span className="mono text-dim" style={{ fontSize: '0.85rem' }}>{exp.years}</span>
                </div>
                <p className="text-dim mt-2">{exp.impact}</p>
              </div>
            ))}
          </div>

          <h3 className="mono mb-4 text-dim">EDUCATION & SKILLS</h3>
          <div className="grid-2">
            <div>
              <p><strong>{resumeData.education.university}</strong></p>
              <p className="text-dim">{resumeData.education.degree}</p>
              <p className="text-dim">Focus: {resumeData.education.focus.join(', ')}</p>
            </div>
            <div>
              <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
                {resumeData.skills.map(s => <span key={s} className="badge">{s}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
          (function() {
            function setupResumeTabs() {
              const btnRaw = document.getElementById('btn-raw-view');
              const btnCompiled = document.getElementById('btn-compiled-view');
              const panelRaw = document.getElementById('panel-raw-view');
              const panelCompiled = document.getElementById('panel-compiled-view');

              if (!btnRaw || !btnCompiled || !panelRaw || !panelCompiled) return;

              btnRaw.onclick = function() {
                btnRaw.classList.add('active');
                btnCompiled.classList.remove('active');
                panelRaw.style.display = 'block';
                panelCompiled.style.display = 'none';
              };

              btnCompiled.onclick = function() {
                btnCompiled.classList.add('active');
                btnRaw.classList.remove('active');
                panelRaw.style.display = 'none';
                panelCompiled.style.display = 'block';
              };
            }

            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', setupResumeTabs);
            } else {
              setupResumeTabs();
            }
            document.addEventListener('astro:after-swap', setupResumeTabs);
          })();
        `
      }} />
    </div>
  );
};

export default ResumeView;
