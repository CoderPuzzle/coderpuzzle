# Solutions — Shift Distance Between Two Strings

## Precomputed Circular Shift Costs

Positions of `s` never interact — an operation always targets one index —
so the total cost decomposes into one independent subproblem per index:
turn character `s[i]` into `t[i]` as cheaply as possible, then sum. Each
subproblem is a shortest path on a 26-node cycle whose edges are the two
cost arrays (`nextCost[j]` stepping `j -> j+1` cyclically, `previousCost[j]`
stepping `j -> j-1`). Between any two letters only two simple paths exist,
clockwise and counter-clockwise, so the pair cost is the minimum of the
wrapped next-sum and the wrapped previous-sum.

The solution precomputes all 26 × 26 pair costs once with prefix sums over
each cost array: the clockwise cost from `a` to `b` is a contiguous range
sum of `nextCost` (wrapping through index 0 when `b <= a`), the
counter-clockwise cost is the mirrored range sum of `previousCost`, and a
letter to itself costs 0. The 676-entry table is then consulted per index
in one pass over the strings. Since each of the two ring sums holds at
most 25 entries of at most 10⁹, one pair costs at most 2.5·10¹⁰ — beyond
32 bits, so the table and the running total are 64-bit in the typed
languages. The total itself is bounded by 10⁵ · 2.5·10¹⁰ = 2.5·10¹⁵, which
is below 2⁵³ ≈ 9.0·10¹⁵, so JavaScript `Number`s represent every possible
answer exactly.

**Complexity:** `O(26² + |s|)` time, `O(26²)` space.
