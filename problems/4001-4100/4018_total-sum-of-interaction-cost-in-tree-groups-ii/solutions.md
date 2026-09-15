# Solutions — Total Sum of Interaction Cost in Tree Groups II

## Small-to-Large Merging with Edge Contributions

Count pairs per edge instead of per pair: removing any edge splits the tree
into two components, and a path crosses that edge exactly once, so a group
with `k` nodes overall and `x` nodes on one side contributes `x * (k - x)`
across it. Rooting the tree, the side below each non-root node is exactly
its subtree, so the answer is a sum over nodes of `sum cnt_g * (k - cnt_g)`.
Rather than recomputing that expression from the whole map at every node,
keep two running scalars alongside each subtree's group-count map:
`A = sum k[g] * cnt[g]` and `B = sum cnt[g]^2`; their difference is the
contribution of the edge leaving the subtree. Absorbing `c` occurrences of
group `g` into a map that already holds `b` updates them in constant time:
`A += k[g] * c` and `B += 2 * b * c + c^2`.

The maps are merged bottom-up in an iterative breadth-first pass, processed
in reverse so every child is finished before its parent; each node adopts
its largest child's map and has its own group plus every smaller child map
absorbed into it. Because a map only ever absorbs maps at most as large,
each node entry is relocated at most `log n` times, which bounds the total
work at `O(n log n)` while keeping chains of `10⁵` nodes far inside any
recursion limit.

Every scalar fits in 64 bits: single products stay near `10¹⁰`, and even
the worst case, one group filling a path of `10⁵` nodes, totals
`(n³ - n) / 6 ≈ 1.7 × 10¹⁴`, well under both signed 64-bit range and
JavaScript's safe-integer bound `2⁵³ ≈ 9 × 10¹⁵`, so plain number
arithmetic is exact there too.

**Complexity:** `O(n log n)` time, `O(n)` space.
