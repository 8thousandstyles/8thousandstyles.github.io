import React from 'react';

const HomeView = () => {
  return (
    <div>
      <h1 className="mono">Runtime Analysis & Systems Architecture</h1>
      <p className="text-dim mb-4" style={{ maxWidth: '800px' }}>
        A portfolio rooted in computational rigor, mechanical sympathy, and algorithmic complexity. 
        Focus is placed on low-level memory layout, cache locality, and scalable concurrency models.
      </p>

      <div className="card mb-8">
        <div className="flex" style={{ justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1.5rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
          <div>
            <span className="mono text-dim" style={{ fontSize: '0.75rem' }}>BENCHMARK_SUITE // KERNEL_EVAL</span>
            <h2 className="mono" style={{ fontSize: '1.1rem', margin: 0, marginTop: '0.25rem' }}>
              Spatial Partitioning & Collision Complexity Report
            </h2>
          </div>
          <span className="badge">N = 100,000 BODIES</span>
        </div>

        <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left', color: 'var(--fg-dim)' }}>
                <th style={{ padding: '0.6rem 0.8rem' }}>ALGORITHM</th>
                <th style={{ padding: '0.6rem 0.8rem' }}>COMPLEXITY</th>
                <th style={{ padding: '0.6rem 0.8rem' }}>EXECUTION TIME</th>
                <th style={{ padding: '0.6rem 0.8rem' }}>MEMORY LOCALITY</th>
                <th style={{ padding: '0.6rem 0.8rem' }}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '0.8rem' }}>Naive All-Pairs Distance</td>
                <td style={{ padding: '0.8rem', color: 'var(--accent)' }}>O(N²)</td>
                <td style={{ padding: '0.8rem' }}>14,280 ms</td>
                <td style={{ padding: '0.8rem', color: 'var(--fg-dim)' }}>Random access / Stride misses</td>
                <td style={{ padding: '0.8rem' }}><span className="badge" style={{ color: 'var(--accent)' }}>UNBOUNDED</span></td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '0.8rem' }}>Spatial Grid Hashing</td>
                <td style={{ padding: '0.8rem', color: 'var(--fg)' }}>O(N)</td>
                <td style={{ padding: '0.8rem' }}>4.8 ms</td>
                <td style={{ padding: '0.8rem', color: 'var(--fg-dim)' }}>Coarse cell binning</td>
                <td style={{ padding: '0.8rem' }}><span className="badge">OPTIMAL</span></td>
              </tr>
              <tr>
                <td style={{ padding: '0.8rem' }}>Barnes-Hut Quadtree</td>
                <td style={{ padding: '0.8rem', color: 'var(--fg)' }}>O(N log N)</td>
                <td style={{ padding: '0.8rem' }}>18.2 ms</td>
                <td style={{ padding: '0.8rem', color: 'var(--fg-dim)' }}>Morton code / Linearized tree</td>
                <td style={{ padding: '0.8rem' }}><span className="badge">PRODUCTION</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="flex gap-4" style={{ flexWrap: 'wrap', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
          <div>
            <span className="mono text-dim" style={{ fontSize: '0.75rem' }}>CACHE_LINE_EFFICIENCY</span>
            <p className="mono" style={{ fontSize: '0.9rem', margin: 0 }}>98.6% L1 Hit</p>
          </div>
          <div>
            <span className="mono text-dim" style={{ fontSize: '0.75rem' }}>SIMD_VECTORIZATION</span>
            <p className="mono" style={{ fontSize: '0.9rem', margin: 0 }}>AVX-512 Enabled</p>
          </div>
          <div>
            <span className="mono text-dim" style={{ fontSize: '0.75rem' }}>THREAD_PARALLELISM</span>
            <p className="mono" style={{ fontSize: '0.9rem', margin: 0 }}>Work-Stealing Pool</p>
          </div>
        </div>
      </div>

      <div className="grid-2 mt-8">
        <div>
          <h3 className="mono">Systems Engineering</h3>
          <p className="text-dim">
            Deep expertise in POSIX compliance, memory management (custom allocators), and high-throughput concurrent processing in C and Rust.
          </p>
        </div>
        <div>
          <h3 className="mono">High-Performance Computing</h3>
          <p className="text-dim">
            Architecting massively parallel algorithms using CUDA and MPI. Optimizing cache locality and leveraging SIMD instructions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeView;
