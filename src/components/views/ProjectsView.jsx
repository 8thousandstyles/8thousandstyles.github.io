import React, { useState, useEffect } from 'react';

const AllocatorVisualizer = () => {
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

const projects = [
  {
    id: 'lock-manager',
    name: 'Distributed Lock Manager',
    spec: 'C++20 / POSIX / Raft',
    desc: 'Implemented a fault-tolerant distributed lock manager based on the Raft consensus algorithm. Designed lock-free queues for the network IO thread pool, achieving 0.8ms P99 lock acquisition latency under peak contention.'
  },
  {
    id: 'nbody',
    name: 'N-Body Barnes-Hut',
    spec: 'CUDA / C++ / WebGL',
    desc: 'GPU-accelerated Barnes-Hut tree construction using Morton codes. Simulated 10^7 particles with O(N log N) complexity. Leveraged warp-synchronous programming to maximize memory bandwidth utilization.'
  }
];

const ProjectsView = () => {
  return (
    <div>
      <h1 className="mono">/bin/projects</h1>
      <p className="text-dim mb-4">
        A selection of high-performance architectural implementations. 
        Focus is placed on memory layout, network consensus, and raw throughput.
      </p>

      <div className="card mb-8">
          <h2 className="mono" style={{ fontSize: '1.2rem', margin: 0, marginBottom: '1rem' }}>O(1) Real-Time Allocator</h2>
          <span className="badge mb-4">C / Assembly / Linux</span>
          <p className="text-dim mb-4">
            A custom slab allocator bypassing glibc malloc. Guaranteed O(1) allocation time with zero unbounded loops, specifically designed for hard real-time kernels. Below is a live visualization comparing memory fragmentation between a naive dynamic allocator and a pre-cached Slab allocator under heavy allocate/free churn.
          </p>
          <AllocatorVisualizer />
      </div>

      <div className="flex" style={{ flexDirection: 'column', gap: '2rem' }}>
        {projects.map(proj => (
          <div key={proj.id} className="card">
            <div className="flex" style={{ justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
              <h2 className="mono" style={{ fontSize: '1.2rem', margin: 0 }}>{proj.name}</h2>
              <span className="badge">{proj.spec}</span>
            </div>
            <p className="text-dim">
              {proj.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsView;
