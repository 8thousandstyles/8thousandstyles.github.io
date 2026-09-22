import React, { useEffect, useRef, useState } from 'react';

const NUM_PARTICLES_DEFAULT = 1500;

const HomeView = () => {
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

      // Reset colors
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
            // Expensive math to force CPU load
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
                  if (dxx*dxx + dyy*dyy < 16) {
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
    <div>
      <h1 className="mono">Runtime Analysis & Physics Kernel</h1>
      <p className="text-dim mb-4" style={{ maxWidth: '800px' }}>
        This portfolio doesn't just state proficiency in computational complexity—it proves it. 
        Below is a live spatial partitioning benchmark simulating {particleCount} bodies. 
        Toggle between a naive <span className="mono">O(N²)</span> collision algorithm and a grid-optimized <span className="mono">O(N)</span> algorithm to observe the real-time impact on CPU latency.
      </p>

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
