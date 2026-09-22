import React from 'react';

const complexityClasses = [
  {
    name: 'EXPTIME',
    definition: 'Deterministic Turing Machine in 2^(p(n)) time',
    bound: 'O(2^n^k)',
    problems: 'Generalized Chess, Checkers, Go (n×n with superko)',
    accent: 'var(--accent)'
  },
  {
    name: 'PSPACE',
    definition: 'Deterministic / Nondeterministic polynomial space',
    bound: 'SPACE(poly(n))',
    problems: 'Quantified Boolean Formulas (QBF), Sokoban, Geography',
    accent: 'var(--fg-dim)'
  },
  {
    name: 'NP / co-NP',
    definition: 'Polynomial-time verifiable / refutable certificates',
    bound: 'NTIME(poly(n))',
    problems: '3-SAT, Traveling Salesperson (TSP), Clique, TAUT',
    accent: 'var(--fg)'
  },
  {
    name: 'P',
    definition: 'Deterministic polynomial-time solvable',
    bound: 'DTIME(poly(n))',
    problems: 'Linear Programming, Maximum Flow, Sorting, Minimum Spanning Tree',
    accent: 'var(--fg)'
  }
];

const AlgorithmsView = () => {
  return (
    <div>
      <h1 className="mono">/lib/algorithms</h1>
      <p className="text-dim mb-4">
        Theoretical computer science, algorithmic complexity frontiers, and applied computational mathematics.
      </p>

      {/* Static Complexity Hierarchy Specification */}
      <div className="card mb-8">
        <div className="flex" style={{ justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
          <div>
            <span className="mono text-dim" style={{ fontSize: '0.75rem' }}>TAXONOMY // COMPLEXITY_LANDSCAPE</span>
            <h2 className="mono" style={{ fontSize: '1.1rem', margin: 0, marginTop: '0.25rem' }}>
              Computational Complexity Class Containment Hierarchy
            </h2>
          </div>
          <span className="mono text-dim" style={{ fontSize: '0.85rem' }}>P ⊆ NP ⊆ PSPACE ⊆ EXPTIME</span>
        </div>

        <div style={{ overflowX: 'auto', marginBottom: '1.25rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left', color: 'var(--fg-dim)' }}>
                <th style={{ padding: '0.6rem 0.8rem' }}>CLASS</th>
                <th style={{ padding: '0.6rem 0.8rem' }}>ASYMPTOTIC BOUND</th>
                <th style={{ padding: '0.6rem 0.8rem' }}>FORMAL CHARACTERIZATION</th>
                <th style={{ padding: '0.6rem 0.8rem' }}>CANONICAL COMPLETE PROBLEMS</th>
              </tr>
            </thead>
            <tbody>
              {complexityClasses.map(c => (
                <tr key={c.name} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '0.8rem', fontWeight: 600, color: c.accent }}>{c.name}</td>
                  <td style={{ padding: '0.8rem' }}><span className="badge">{c.bound}</span></td>
                  <td style={{ padding: '0.8rem', color: 'var(--fg-dim)' }}>{c.definition}</td>
                  <td style={{ padding: '0.8rem' }}>{c.problems}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mono text-dim" style={{ fontSize: '0.8rem', background: '#0a0a0a', padding: '0.85rem 1rem', border: '1px solid var(--border)' }}>
          <strong style={{ color: 'var(--fg)' }}>OPEN_PROBLEM:</strong> P vs NP • NP ∩ co-NP \ P • Quantum Polynomial Time (BQP) containment relative to PH.
        </div>
      </div>

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
