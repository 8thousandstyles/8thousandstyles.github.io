---
title: "Distributed Lock Manager"
spec: "C++20 / POSIX / Raft"
order: 2
tags: ["#distributed-systems", "#raft", "#cpp", "#networking"]
github: "https://github.com"
blog: "https://example.com"
---

Implemented a fault-tolerant distributed lock manager based on the Raft consensus algorithm. Designed lock-free queues for the network IO thread pool, achieving 0.8ms P99 lock acquisition latency under peak contention.
