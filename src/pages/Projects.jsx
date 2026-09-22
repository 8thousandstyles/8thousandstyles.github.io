import React from 'react';

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
  },
  {
    id: 'allocator',
    name: 'O(1) Real-Time Allocator',
    spec: 'C / Assembly / Linux',
    desc: 'A custom slab allocator bypassing glibc malloc. Guaranteed O(1) allocation time with zero unbounded loops, specifically designed for hard real-time audio processing kernels.'
  }
];

const Projects = () => {
  return (
    <div>
      <h1 className="mono">/bin/projects</h1>
      <p className="text-dim mb-8">
        A selection of high-performance architectural implementations. 
        Focus is placed on memory layout, network consensus, and raw throughput.
      </p>

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

export default Projects;
