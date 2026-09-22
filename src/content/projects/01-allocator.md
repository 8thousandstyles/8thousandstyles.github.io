---
title: "O(1) Real-Time Allocator"
spec: "C / Assembly / Linux"
order: 1
tags: ["#linux", "#kernel", "#c", "#realtime"]
github: "https://github.com"
demo: "https://example.com"
blog: "allocator"
---

A custom slab allocator bypassing glibc malloc. Guaranteed O(1) allocation and free time with zero unbounded loops, specifically designed for hard real-time kernels and audio DSP pipelines.
