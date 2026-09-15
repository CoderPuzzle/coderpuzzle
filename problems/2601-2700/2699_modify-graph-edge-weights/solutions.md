# Solutions — Modify Graph Edge Weights

One Dijkstra-driven strategy covers every implementation below; the
language files differ only in heap plumbing, integer widths, and syntax.

## Iterative deficit-fill Dijkstra

Establish feasibility with two shortest-path passes from `source`: one
over the fixed positive edges only (`-1` edges dropped), and one after
replacing every `-1` weight by its smallest legal value `1`. Because
assignments can only add weight to existing routes, the positive-only
distance is a floor: if it already sits below `target`, no assignment can
land back on `target`, so return `[]`. The all-ones distance is a
ceiling: if even that minimal assignment overshoots `target`, every legal
assignment does, so return `[]` as well. In between, an achieving
assignment exists and the search below constructs one.

Keep the all-ones vector as the working assignment and repeat: run
Dijkstra over the current assignment from `source` and from
`destination`. If the shortest distance to `destination` still misses
`target`, every remaining-shortest route uses at least one modifiable
edge (a purely positive route would have tripped the first gate), so scan
the `-1` edges for one binding a shortest route through pure value tests:
`d_src[u] + w + d_dst[v] == cur`, or with the endpoints mirrored. Distance
values, never heap pop order, drive every decision, so the answer is
deterministic. Lift the winning edge — lowest `d_src` endpoint distance,
earliest index on ties — by the whole remaining deficit `target - cur`.
The routes through that alignment rise out of contention while the
augmented route lands exactly on `target`; distances only ever grow, so
the loop closes when the measured shortest distance equals `target`.

Two budget facts hold. An edge is scanned only while it binds the current
shortest path, which pins its working weight below `target <= 10⁹`;
lifting adds less than another `target`, so every emitted weight stays
inside the required `[1, 2 × 10⁹]`. And path sums reach roughly
`(n - 1) × 2 × 10⁹ ≈ 2 × 10¹¹`, past 32-bit range, so every language
carries 64-bit distances (`long long` / `int64` / 64-bit ints; JavaScript
numbers stay exact well under `2⁵³`) while emitting 32-bit-safe weights.

**Complexity:** `O(m log n)` time per Dijkstra pass (the fill loop
repeats passes until the distance meets `target`), `O(n + m)` space.
