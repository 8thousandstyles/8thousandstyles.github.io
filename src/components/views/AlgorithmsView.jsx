import React, { useEffect, useRef, useState, useCallback } from 'react';

const ComplexityMap = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const [tooltip, setTooltip] = useState(null);

  // Brutalist Palette
  const colors = {
    exptime: '#ff3366', // accent red
    pspace: '#555555',  // dim gray
    np: '#ffffff',      // stark white
    conp: '#888888',    // medium gray
    p: '#ffffff',       // stark white
    bgAlpha: 'rgba(255,255,255,0.05)'
  };

  const regions = [
    { id: 'exptime', label: 'EXPTIME', x: 0.02, y: 0.06, w: 0.96, h: 0.88, color: colors.exptime, desc: 'Decidable in O(2^p(n)) time' },
    { id: 'pspace', label: 'PSPACE', x: 0.07, y: 0.13, w: 0.80, h: 0.74, color: colors.pspace, desc: 'Decidable in poly(n) space' },
    { id: 'np', label: 'NP', x: 0.12, y: 0.20, w: 0.48, h: 0.56, color: colors.np, desc: 'Verifiable in poly(n) time' },
    { id: 'conp', label: 'co-NP', x: 0.40, y: 0.20, w: 0.40, h: 0.48, color: colors.conp, desc: 'Complements of NP problems' },
    { id: 'p', label: 'P', x: 0.17, y: 0.30, w: 0.30, h: 0.34, color: colors.p, desc: 'Decidable in poly(n) time' },
  ];

  const problems = [
    { name: 'Sorting', x: 0.24, y: 0.42, region: 'p', note: 'O(n log n) optimal' },
    { name: 'Max Flow', x: 0.26, y: 0.54, region: 'p', note: 'O(V²E)' },
    { name: 'SAT', x: 0.19, y: 0.27, region: 'np', note: 'NP-Complete' },
    { name: 'TSP', x: 0.15, y: 0.44, region: 'np', note: 'NP-Complete' },
    { name: 'TAUT', x: 0.55, y: 0.30, region: 'conp', note: 'co-NP-Complete' },
    { name: 'Go', x: 0.74, y: 0.28, region: 'pspace', note: 'PSPACE-Complete' },
    { name: 'Chess', x: 0.10, y: 0.10, region: 'exptime', note: 'EXPTIME-Complete' },
  ];

  useEffect(() => {
    const c = canvasRef.current;
    if (!c || !containerRef.current) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    let id;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      const rect = containerRef.current.getBoundingClientRect();
      c.width = rect.width * dpr;
      c.height = rect.height * dpr;
      c.style.width = rect.width + 'px';
      c.style.height = rect.height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const roundRect = (x, y, w, h, r) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r); ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h); ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r); ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    };

    const draw = () => {
      const cw = c.width / dpr, ch = c.height / dpr;
      ctx.clearRect(0, 0, cw, ch);

      // Draw regions
      regions.forEach((r) => {
        const rx = r.x * cw, ry = r.y * ch, rw = r.w * cw, rh = r.h * ch;
        const isHov = hovered === r.id;
        
        ctx.fillStyle = colors.bgAlpha; 
        if (isHov) {
            ctx.fillStyle = 'rgba(255,255,255,0.1)';
        }
        roundRect(rx, ry, rw, rh, 0);
        ctx.fill();

        ctx.strokeStyle = r.color; 
        ctx.lineWidth = isHov ? 2 : 1;
        roundRect(rx, ry, rw, rh, 0); 
        ctx.stroke();

        const lx = r.id === 'conp' ? rx + rw - 14 : rx + 14;
        const ly = r.id === 'conp' ? ry + 22 : ry + 22;
        ctx.font = '600 12px "JetBrains Mono", monospace';
        ctx.fillStyle = r.color;
        ctx.textAlign = r.id === 'conp' ? 'right' : 'left';
        ctx.fillText(r.label, lx, ly);
        ctx.textAlign = 'left';
      });

      // Draw problems
      problems.forEach(p => {
        const regionObj = regions.find(r => r.id === p.region);
        const px = p.x * cw, py = p.y * ch;
        const isHov = hovered === 'prob_' + p.name;
        const rad = isHov ? 5 : 3;

        ctx.fillStyle = isHov ? colors.exptime : regionObj.color;
        ctx.beginPath(); 
        ctx.arc(px, py, rad, 0, Math.PI * 2); 
        ctx.fill();

        ctx.font = '400 11px "JetBrains Mono", monospace';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(p.name, px + rad + 6, py + 4);
      });

      // "?" in NP ∩ co-NP
      const qx = 0.47 * cw, qy = 0.40 * ch;
      ctx.font = '700 28px "Inter", sans-serif'; ctx.fillStyle = colors.conp;
      ctx.textAlign = 'center'; ctx.fillText('?', qx, qy); ctx.textAlign = 'left';

      id = requestAnimationFrame(draw);
    };
    id = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize); };
  }, [hovered]);

  const handleMouse = useCallback((e) => {
    const c = canvasRef.current; if (!c) return;
    const rect = c.getBoundingClientRect();
    const mx = e.clientX - rect.left, my = e.clientY - rect.top;
    const cw = rect.width, ch = rect.height;
    let found = null;

    for (const p of problems) {
      const px = p.x * cw, py = p.y * ch;
      if (Math.hypot(mx - px, my - py) < 15) {
        found = 'prob_' + p.name;
        setTooltip({ x: e.clientX - rect.left + 15, y: e.clientY - rect.top - 10, name: p.name, note: p.note });
        break;
      }
    }
    if (!found) {
      for (let i = regions.length - 1; i >= 0; i--) {
        const r = regions[i];
        const rx = r.x * cw, ry = r.y * ch, rw = r.w * cw, rh = r.h * ch;
        if (mx >= rx && mx <= rx + rw && my >= ry && my <= ry + rh) { found = r.id; break; }
      }
    }
    if (!found) setTooltip(null);
    setHovered(found);
  }, []);

  const handleLeave = useCallback(() => { setHovered(null); setTooltip(null); }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative', border: '1px solid var(--border)', aspectRatio: '16/9', marginBottom: '3rem', background: 'var(--bg)' }}>
      <canvas ref={canvasRef} onMouseMove={handleMouse} onMouseLeave={handleLeave} style={{ width: '100%', height: '100%', cursor: 'crosshair', display: 'block' }} />
      {tooltip && (
        <div style={{ position: 'absolute', left: tooltip.x, top: tooltip.y, background: '#111', border: '1px solid var(--border)', padding: '0.5rem', zIndex: 10, pointerEvents: 'none' }}>
          <div className="mono" style={{ fontSize: '0.85rem', color: '#fff' }}>{tooltip.name}</div>
          <div className="text-dim" style={{ fontSize: '0.75rem' }}>{tooltip.note}</div>
        </div>
      )}
    </div>
  );
};

const AlgorithmsView = () => {
  return (
    <div>
      <h1 className="mono">/lib/algorithms</h1>
      <p className="text-dim mb-4">
        Theoretical analysis and applied computational mathematics. Below is an interactive mapping of the foundational complexity classes guiding algorithm design limits.
      </p>

      <ComplexityMap />

      <div className="card mb-4">
        <h2 className="mono" style={{ fontSize: '1.1rem' }}>Graph Theory: Network Flow</h2>
        <div className="mb-2">
          <span className="badge">Time Complexity: O(V²E)</span>
        </div>
        <p className="text-dim mb-4">
          Deep understanding of max-flow min-cut theorems. Implemented Push-Relabel algorithms with gap heuristics for bipartite matching in distributed scheduling systems.
        </p>
        <pre className="mono" style={{ background: '#111', padding: '1rem', border: '1px solid var(--border)', fontSize: '0.85rem', overflowX: 'auto' }}>
{`// Simplified Push-Relabel Heuristic Concept
void discharge(int u) {
    while (excess[u] > 0) {
        if (current_edge[u] < graph[u].size()) {
            int v = graph[u][current_edge[u]];
            if (capacity[u][v] - flow[u][v] > 0 && height[u] == height[v] + 1) {
                push(u, v);
            } else {
                current_edge[u]++;
            }
        } else {
            relabel(u);
            current_edge[u] = 0;
        }
    }
}`}
        </pre>
      </div>

      <div className="card">
        <h2 className="mono" style={{ fontSize: '1.1rem' }}>Cryptographic Primitives</h2>
        <div className="mb-2">
          <span className="badge">Focus: Side-Channel Resistance</span>
        </div>
        <p className="text-dim">
          Implemented lattice-based cryptographic algorithms focusing strictly on constant-time operations. Replaced branching conditionals with bitwise multiplexing to prevent timing attacks during polynomial multiplication.
        </p>
      </div>
    </div>
  );
};

export default AlgorithmsView;
