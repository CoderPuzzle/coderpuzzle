# Solutions — Graph Connectivity With Threshold

## Union-Find Sieve

Building the road graph directly is hopeless — it can have quadratically many edges. Instead note that cities `x` and `y` are adjacent whenever some common divisor `z > threshold` exists, so for each candidate divisor `z` from `threshold + 1` to `n`, every pair of multiples of `z` is connected through `z` itself. It therefore suffices to union `z` with each of its multiples `2z, 3z, …` in a disjoint-set union structure; two cities end up connected exactly when they share such a divisor chain.

The union phase is a sieve: the total number of `union` calls is the harmonic sum `n/(threshold+1) + n/(threshold+2) + …`, bounded by `O(n log n)`. Path compression (path halving in `find`) keeps these operations effectively constant on average, and each query then reduces to comparing the roots of its two cities. A further skip avoids redundant passes: if `z` has already been merged into a smaller representative, its multiples were merged by that smaller divisor's pass too, so `z`'s inner loop can be dropped.

Two boundary behaviors are worth noting. When `threshold = 0`, the pass over `z = 1` unions 1 with every number, correctly marking all queries true (the `z > 1` guard exempts 1 from the skip so its pass always runs). City 1 itself has no divisor above any nonnegative threshold except when `threshold = 0`, so it stays isolated otherwise.

**Complexity:** `O(n log n + q)` time, `O(n)` space.
