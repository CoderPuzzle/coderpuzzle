# Solutions — Robot Collisions

## Sorted Stack Simulation

Sort the robots by position and sweep left to right. Every collision involves a right-mover and a left-mover meeting face to face, so the only state needed is a stack of robots that have survived the sweep so far: right-movers are pushed as they come, and any left-moving robot must resolve duels against right-movers sitting on top of the stack before it can rest.

Each duel follows the rules directly: a strictly weaker stack top is popped and the incoming robot loses one health and keeps fighting the next top; a strictly stronger top survives with one less health and the incoming robot dies; equal health removes both. A left-mover that exhausts the right-movers on the stack is itself pushed — same-direction robots ahead of it can never collide with it. All health changes are written into the `healths` array so survivors carry their decremented values.

![Robots of example 2 on the line (R 15, R 10, L 10, L 12) and the stack snapshots of the sweep: two pushes, an equal-health double kill, and a duel that leaves 14.](figures/solution-stack-duels.svg)

The survivors are exactly the stack contents, but the answer must be reported in the original input order, so the code collects the stack indices into a set and filters `range(n)` by membership. After the sort, each robot is pushed and popped at most once, making the simulation linear in the sweep.

**Complexity:** `O(n log n)` time, `O(n)` space.
