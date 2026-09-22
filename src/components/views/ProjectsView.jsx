import React from 'react';

const projects = [
  {
    id: 'allocator',
    name: 'O(1) Real-Time Allocator',
    spec: 'C / Assembly / Linux',
    desc: 'A custom slab allocator bypassing glibc malloc. Guaranteed O(1) allocation and free time with zero unbounded loops, specifically designed for hard real-time kernels and audio DSP pipelines.',
    details: {
      latency: '< 18ns per allocation',
      fragmentation: '0% external fragmentation',
      concurrency: 'Per-thread lock-free magazinelist caches'
    }
  },
  {
    id: 'lock-manager',
    name: 'Distributed Lock Manager',
    spec: 'C++20 / POSIX / Raft',
    desc: 'Implemented a fault-tolerant distributed lock manager based on the Raft consensus algorithm. Designed lock-free queues for the network IO thread pool, achieving 0.8ms P99 lock acquisition latency under peak contention.',
    details: {
      latency: '0.8ms P99 under peak load',
      consensus: 'Raft state machine replication',
      io: 'io_uring non-blocking network subsystem'
    }
  },
  {
    id: 'nbody',
    name: 'N-Body Barnes-Hut',
    spec: 'CUDA / C++ / WebGL',
    desc: 'GPU-accelerated Barnes-Hut tree construction using Morton codes. Simulated 10^7 particles with O(N log N) complexity. Leveraged warp-synchronous programming to maximize memory bandwidth utilization.',
    details: {
      scale: '10^7 interactive particle bodies',
      memory: 'Warp-synchronous shared memory tiling',
      complexity: 'O(N log N) spatial hierarchical tree'
    }
  }
];

const ProjectsView = () => {
  return (
    <div>
      <h1 className="mono">/bin/projects</h1>
      <p className="text-dim mb-4">
        A selection of high-performance architectural implementations. 
        Focus is placed on deterministic execution, memory layout, and raw throughput.
      </p>

      {/* Static Architectural Blueprint for O(1) Allocator */}
      <div className="card mb-8">
        <div className="flex" style={{ justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
          <div>
            <span className="mono text-dim" style={{ fontSize: '0.75rem' }}>FEATURED_SYSTEM_KERNEL</span>
            <h2 className="mono" style={{ fontSize: '1.2rem', margin: 0, marginTop: '0.25rem' }}>
              O(1) Slab Allocator Memory Architecture
            </h2>
          </div>
          <span className="badge">C23 / BARE_METAL</span>
        </div>

        <p className="text-dim mb-4">
          Eliminating nondeterministic glibc heap traversal by pre-allocating segregated caches for fixed-size object bins. Memory blocks are recycled in L1 cache order, providing strictly bounded allocation latencies.
        </p>

        {/* Static Memory Slab Layout Map */}
        <div style={{ background: '#0a0a0a', border: '1px solid var(--border)', padding: '1.25rem', marginBottom: '1rem' }}>
          <div className="flex" style={{ justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span className="mono text-dim" style={{ fontSize: '0.75rem' }}>SLAB_PAGE_MAP [ 32-BYTE CACHE BIN ]</span>
            <span className="mono text-dim" style={{ fontSize: '0.75rem' }}>PAGED POOL: 4096 BYTES</span>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(16, 1fr)', gap: '4px', marginBottom: '0.75rem' }}>
            {Array.from({ length: 32 }).map((_, i) => (
              <div 
                key={i} 
                style={{ 
                  height: '22px', 
                  background: i % 3 === 0 ? 'var(--accent)' : 'var(--border)',
                  border: '1px solid #1a1a1a'
                }} 
              />
            ))}
          </div>

          <div className="flex gap-4 mono text-dim" style={{ fontSize: '0.75rem' }}>
            <div className="flex items-center gap-2">
              <span style={{ display: 'inline-block', width: '10px', height: '10px', background: 'var(--accent)' }} />
              <span>ALLOCATED OBJECT BLOCK</span>
            </div>
            <div className="flex items-center gap-2">
              <span style={{ display: 'inline-block', width: '10px', height: '10px', background: 'var(--border)' }} />
              <span>FREE SLAB ENTRY (L1 CACHED)</span>
            </div>
          </div>
        </div>

        <div className="grid-2" style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
          <div>
            <span className="mono text-dim" style={{ fontSize: '0.75rem' }}>DETERMINISM</span>
            <p className="mono" style={{ margin: 0, fontSize: '0.85rem' }}>Guaranteed O(1) allocate & free cycles</p>
          </div>
          <div>
            <span className="mono text-dim" style={{ fontSize: '0.75rem' }}>EXTERNAL FRAGMENTATION</span>
            <p className="mono" style={{ margin: 0, fontSize: '0.85rem' }}>0% via uniform power-of-two slab bins</p>
          </div>
        </div>
      </div>

      <div className="flex" style={{ flexDirection: 'column', gap: '2rem' }}>
        {projects.map(proj => (
          <div key={proj.id} className="card">
            <div className="flex" style={{ justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
              <h2 className="mono" style={{ fontSize: '1.2rem', margin: 0 }}>{proj.name}</h2>
              <span className="badge">{proj.spec}</span>
            </div>
            <p className="text-dim mb-4">
              {proj.desc}
            </p>
            {proj.details && (
              <div className="flex gap-4 mono text-dim" style={{ fontSize: '0.8rem', borderTop: '1px solid var(--border)', paddingTop: '0.75rem', flexWrap: 'wrap' }}>
                {Object.entries(proj.details).map(([k, v]) => (
                  <span key={k}>
                    <strong style={{ color: 'var(--fg)', textTransform: 'uppercase' }}>{k}:</strong> {v}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsView;
