# Solutions — Minimum Reverse Operations

## BFS over positions with parity jump sets

One operation mirrors the subarray holding the single 1, so if the 1 sits
at `x`, reversing the window `[l, l+k-1]` lands it at `y = 2*l + k - 1 - x`.
The start `l` may range over `[max(0, x-k+1), min(x, n-k)]`, and over that
range `y` sweeps a contiguous run of one fixed parity: every destination
shares the parity of `k-1-x`. Because each move preserves legality only
when the landing cell is not banned, the minimum-operation counts are just
shortest paths in this implicit graph — a plain breadth-first search from
`p` visits each position once, and banned cells are deleted up front (they
also force `-1`, since the 1 can never stand there).

The efficiency question is enumerating unvisited destinations inside the
parity run without rescanning it. Keep two jump-pointer arrays, one per
parity: entry `i` points to the smallest alive slot of that parity at or
after slot `i`, and consuming a position fuses its slot into its successor,
with path compression keeping chains short. Each BFS pop computes the run's
endpoints arithmetically, then walks consecutive successors until it leaves
the range; every consumed slot is removed exactly once across the whole
search. That makes the total work near-linear in `n` plus the ban count
instead of the naive `O(n * k)` edge enumeration.

**Complexity:** `O((n + |banned|) · α(n))` time, `O(n)` space.
