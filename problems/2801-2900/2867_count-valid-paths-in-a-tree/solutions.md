# Solutions — Count Valid Paths in a Tree

## Tree DP over Prime Counts

First identify primes up to `n` with a sieve of Eratosthenes — node labels, not values, are what primality is tested on. A path is valid when exactly one node on it is prime, so the work reduces to counting, for every node, the descendants reachable via vertical paths holding zero primes and via vertical paths holding exactly one, then pairing those branches where they meet.

Root the tree at node 1 using an iterative BFS order (recursion would risk stack overflow at `n = 10^5`). For each node `x` define `dp0[x]` and `dp1[x]`: the number of nodes `y` in `x`'s subtree such that the vertical path `x..y` contains zero, respectively exactly one, prime. Processing the order in reverse (children first), a prime `x` contributes `dp0[x] = 0, dp1[x] = 1` — every downward path from it already contains its own prime — while a composite `x` starts from `dp0[x] = 1, dp1[x] = 0`. Each child `y` merges in: if `x` is prime the child's prime-free paths become one-prime paths (`dp1[x] += dp0[y]`, nothing can stay prime-free), otherwise both counters add directly.

Every path with exactly one prime is counted exactly once, at its apex `x`. When combining an already-accumulated multiset of branches (totals `total0`, `total1`) with a new child's paths (`c0`, `c1`), the new pairs through `x` with exactly one prime total are: if `x` is prime, both halves must be single-prime paths so the shared prime is not doubled (`total1 * c1`); if `x` is composite, exactly one half carries the prime (`total0 * c1 + total1 * c0`). The totals include `x` itself, so paths ending at `x` are covered, and pairs of branches are counted at their meeting point rather than twice.

**Complexity:** `O(n log log n)` time, `O(n)` space.
