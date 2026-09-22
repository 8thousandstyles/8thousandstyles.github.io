import React from 'react';

const Algorithms = () => {
  return (
    <div>
      <h1 className="mono">/lib/algorithms</h1>
      <p className="text-dim mb-8">
        Theoretical analysis and applied computational mathematics.
      </p>

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

export default Algorithms;
