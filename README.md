# SYS_ARCHITECT — Systems, HPC & Theory Portfolio

A high-performance, brutalist static portfolio and computational workspace built with **Astro** and **React** (Islands Architecture).

---

## Architecture

- **Engine:** Astro (Static Site Generation / SSG)
- **UI & Islands:** React 19 (Zero-JS static HTML by default, interactive islands where needed)
- **Typography:** JetBrains Mono (monospaced system readouts) & Inter (clean technical documentation)
- **Styling:** Vanilla Brutalist CSS (`src/index.css`) with instant zero-flicker Light/Dark mode

### Route Structure
- `/` (`src/pages/index.astro`): `/sys/benchmark` — Runtime analysis & systems engineering overview
- `/projects` (`src/pages/projects.astro`): `/bin/projects` — High-performance distributed systems & kernels
- `/algorithms` (`src/pages/algorithms.astro`): `/lib/algorithms` — Theoretical analysis, graph theory, cryptography
- `/resume` (`src/pages/resume.astro`): `/etc/profile` — Curriculum Vitae (Raw JSON & Compiled HTML views)
- `/contact` (`src/pages/contact.astro`): `/etc/network` — REST API endpoint format contact specification

---

## Preserved Animated Components Archive

The following interactive, canvas-driven, and animated components were developed for the portfolio and are preserved below for future reference, benchmarking, or re-activation.

---

### 1. 2D Particle Collision Physics Benchmark (`ParticleBenchmark.jsx`)

**Description:**
A real-time 2D spatial physics kernel simulating 1,500+ bodies on an HTML5 `<canvas>`. Allows toggling between a naive $O(N^2)$ brute-force collision test (which drives down framerate under CPU saturation) and a spatial-grid partitioned $O(N)$ algorithm that stabilizes the framerate.

```jsx
import React, { useEffect, useRef, useState } from 'react';

const NUM_PARTICLES_DEFAULT = 1500;

export const ParticleBenchmark = () => {
  const canvasRef = useRef(null);
  const [mode, setMode] = useState('naive'); // 'naive' or 'optimized'
  const [fps, setFps] = useState(0);
  const [particleCount, setParticleCount] = useState(NUM_PARTICLES_DEFAULT);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrameId;
    let lastTime = performance.now();
    let frameCount = 0;
    let lastFpsTime = lastTime;

    // Initialize particles
    let particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      radius: 2,
      color: '#444444'
    }));

    const update = () => {
      const currentTime = performance.now();
      frameCount++;
      
      if (currentTime - lastFpsTime >= 500) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastFpsTime)));
        frameCount = 0;
        lastFpsTime = currentTime;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particleCount; i++) {
        particles[i].color = '#444444';
      }

      if (mode === 'naive') {
        // O(N^2) Collision Check
        for (let i = 0; i < particleCount; i++) {
          let p1 = particles[i];
          for (let j = i + 1; j < particleCount; j++) {
            let p2 = particles[j];
            let dx = p2.x - p1.x;
            let dy = p2.y - p1.y;
            let dist = Math.sqrt(dx * dx + dy * dy); 
            if (dist < p1.radius + p2.radius + 2) {
              p1.color = '#ff3366';
              p2.color = '#ff3366';
            }
          }
        }
      } else {
        // O(N) Spatial Grid Optimization
        const gridSize = 10;
        const grid = new Map();
        
        for (let i = 0; i < particleCount; i++) {
          let p = particles[i];
          let gx = Math.floor(p.x / gridSize);
          let gy = Math.floor(p.y / gridSize);
          let key = `${gx},${gy}`;
          if (!grid.has(key)) grid.set(key, []);
          grid.get(key).push(p);
        }

        for (let i = 0; i < particleCount; i++) {
          let p1 = particles[i];
          let gx = Math.floor(p1.x / gridSize);
          let gy = Math.floor(p1.y / gridSize);
          
          for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
              let cell = grid.get(`${gx + dx},${gy + dy}`);
              if (cell) {
                for (let p2 of cell) {
                  if (p1 === p2) continue;
                  let dxx = p2.x - p1.x;
                  let dyy = p2.y - p1.y;
                  if (dxx * dxx + dyy * dyy < 16) {
                    p1.color = '#ff3366';
                  }
                }
              }
            }
          }
        }
      }

      // Physics update & Draw
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < particleCount; i++) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(update);
    };

    update();

    return () => cancelAnimationFrame(animationFrameId);
  }, [mode, particleCount]);

  return (
    <div className="benchmark-container">
      <div className="benchmark-overlay">
        <div className="mb-2">
          <span className="text-dim">METRICS:</span><br/>
          <span>FPS: {fps}</span><br/>
          <span>PARTICLES: {particleCount}</span><br/>
          <span>ALGO: {mode === 'naive' ? 'O(N²) Brute Force' : 'O(N) Spatial Grid'}</span>
        </div>
        
        <div className="flex gap-2">
          <button 
            className={mode === 'naive' ? 'active' : ''} 
            onClick={() => setMode('naive')}
          >
            Set O(N²)
          </button>
          <button 
            className={mode === 'optimized' ? 'active' : ''} 
            onClick={() => setMode('optimized')}
          >
            Set O(N)
          </button>
        </div>
        <div className="flex gap-2" style={{ marginTop: '0.5rem' }}>
          <button onClick={() => setParticleCount(p => Math.max(500, p - 500))}>- 500</button>
          <button onClick={() => setParticleCount(p => Math.min(5000, p + 500))}>+ 500</button>
        </div>
      </div>
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={400} 
        style={{ width: '100%', height: '400px', display: 'block', background: '#050505' }}
      />
    </div>
  );
};
```

---

### 2. Live Memory Allocator & Fragmentation Visualizer (`AllocatorVisualizer.jsx`)

**Description:**
A live simulation running on a 100ms interval that churns memory allocations and deallocations. Demonstrates how a naive dynamic allocator causes memory fragmentation over time, whereas an $O(1)$ Slab Allocator with fixed-size cache bins preserves contiguous memory and eliminates fragmentation.

```jsx
import React, { useState, useEffect } from 'react';

export const AllocatorVisualizer = () => {
  const [mode, setMode] = useState('slab'); // 'naive' or 'slab'
  const [memory, setMemory] = useState(Array(100).fill(null));
  const [stats, setStats] = useState({ allocations: 0, frees: 0, fragmentation: 0 });

  useEffect(() => {
    let interval;
    if (mode) {
      interval = setInterval(() => {
        setMemory(prev => {
          let newMem = [...prev];
          let action = Math.random() > 0.4 ? 'allocate' : 'free';
          
          if (action === 'allocate') {
            if (mode === 'naive') {
              let size = Math.floor(Math.random() * 5) + 1;
              let startIdx = -1;
              for (let i = 0; i <= newMem.length - size; i++) {
                let canFit = true;
                for (let j = 0; j < size; j++) {
                  if (newMem[i+j] !== null) { canFit = false; break; }
                }
                if (canFit && Math.random() > 0.5) { startIdx = i; break; }
                if (canFit && startIdx === -1) startIdx = i;
              }
              if (startIdx !== -1) {
                for(let i=0; i<size; i++) newMem[startIdx+i] = 'allocated';
                setStats(s => ({ ...s, allocations: s.allocations + 1 }));
              }
            } else if (mode === 'slab') {
              for (let i = 0; i < newMem.length; i++) {
                if (newMem[i] === null) {
                  newMem[i] = 'allocated';
                  setStats(s => ({ ...s, allocations: s.allocations + 1 }));
                  break;
                }
              }
            }
          } else {
            let allocatedIndexes = [];
            newMem.forEach((val, idx) => { if(val !== null) allocatedIndexes.push(idx); });
            if (allocatedIndexes.length > 0) {
              let idxToFree = allocatedIndexes[Math.floor(Math.random() * allocatedIndexes.length)];
              newMem[idxToFree] = null;
              setStats(s => ({ ...s, frees: s.frees + 1 }));
            }
          }
          
          let fragCount = 0;
          let inFreeBlock = false;
          let totalFree = 0;
          for(let i=0; i<newMem.length; i++){
              if(newMem[i] === null) {
                  totalFree++;
                  if(!inFreeBlock) fragCount++;
                  inFreeBlock = true;
              } else {
                  inFreeBlock = false;
              }
          }
          setStats(s => ({ ...s, fragmentation: totalFree === 0 ? 0 : Math.round((fragCount / totalFree) * 100) }));
          
          return newMem;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [mode]);

  const reset = () => {
    setMemory(Array(100).fill(null));
    setStats({ allocations: 0, frees: 0, fragmentation: 0 });
  };

  return (
    <div className="benchmark-container">
      <div className="benchmark-overlay" style={{ background: 'var(--bg)' }}>
        <div className="mb-2">
          <span className="text-dim">METRICS:</span><br/>
          <span>ALLOCS: {stats.allocations}</span><br/>
          <span>FREES: {stats.frees}</span><br/>
          <span>FRAGMENTATION: <span style={{ color: stats.fragmentation > 30 ? 'var(--accent)' : 'var(--fg)' }}>{stats.fragmentation}%</span></span>
        </div>
        <div className="flex gap-2">
          <button className={mode === 'slab' ? 'active' : ''} onClick={() => { setMode('slab'); reset(); }}>
            O(1) Slab Allocator
          </button>
          <button className={mode === 'naive' ? 'active' : ''} onClick={() => { setMode('naive'); reset(); }}>
            Naive Allocator
          </button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(20, 1fr)', gap: '2px', padding: '1rem', background: '#050505', minHeight: '300px', alignContent: 'end' }}>
        {memory.map((block, i) => (
          <div key={i} style={{ 
            aspectRatio: '1', 
            background: block ? 'var(--accent)' : '#222',
            border: '1px solid #111',
            transition: 'background 0.1s'
          }} />
        ))}
      </div>
    </div>
  );
};
```

---

### 3. Interactive Complexity Map Canvas (`ComplexityMap.jsx`)

**Description:**
An interactive 2D canvas mapping the landmark computational complexity classes ($P \subseteq NP \subseteq PSPACE \subseteq EXPTIME$) and $co\text{-}NP$ with real-time mouse coordinate hit-testing, dynamic tooltips, and landmark problem plotting (e.g. 3-SAT, Max Flow, TSP, QBF, Chess).

```jsx
import React, { useEffect, useRef, useState, useCallback } from 'react';

export const ComplexityMap = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [hovered, setHovered] = useState(null);
  const [tooltip, setTooltip] = useState(null);

  const colors = {
    exptime: '#ff3366',
    pspace: '#555555',
    np: '#ffffff',
    conp: '#888888',
    p: '#ffffff',
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

      regions.forEach((r) => {
        const rx = r.x * cw, ry = r.y * ch, rw = r.w * cw, rh = r.h * ch;
        const isHov = hovered === r.id;
        
        ctx.fillStyle = isHov ? 'rgba(255,255,255,0.1)' : colors.bgAlpha;
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
```

---

## Development Commands

```bash
# Start local dev server (default port 4321)
npm run dev

# Build production static output in /dist
npm run build

# Preview static production build
npm run preview
```
