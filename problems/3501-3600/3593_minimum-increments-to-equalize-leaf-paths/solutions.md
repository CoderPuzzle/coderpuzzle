# Solutions — Minimum Increments to Equalize Leaf Paths

## Two-pass tree DP over path maxima

Every change is an increase, so the common final score of all root-to-leaf
paths is forced: it is `M`, the largest raw path sum — no path can be
lowered onto the others. Now think of the required raises bottom-up. For a
node `v`, let `f[v]` be the largest raw path sum over all root-to-leaf paths
passing through `v`; the total raise that must be contributed by `v`'s
subtree is the gap `g[v] = M - f[v]`. Along any root-to-leaf path the gap
can never shrink going down — a deeper node's paths are a subset — so
`g[v] >= g[parent]` always. An increase is charged to a node exactly when
its gap strictly exceeds its parent's: that jump cannot be paid higher up,
and placing it at `v` serves every leaf below. The answer is the number of
nodes whose gap jumps, which by the monotonicity is the same set hinted at
by "differs from minIncrease[parent]".

Computing `f` takes two iterative passes over a rooted ordering of the
tree (explicit stacks: a path-shaped tree drives recursion depth to
`10⁵`). Bottom-up, `down[v]` is the largest raw suffix sum from `v` to a
leaf. Top-down, `f[v] = prefix(parent) + down[v]`, and the counting rule
`f[v] < f[parent]` is applied against a propagated running minimum, which
matches the gap-jump condition because the gap's running maximum along a
path is its value at the current node. Both passes are `O(n)`.

All intermediate sums are path costs, bounded by
`n · max(cost) = 10⁵ · 10⁹ = 10¹⁴`, which overflows 32 bits — the walk runs
on 64-bit integers (`long long`/`long`/`int64`). The bound is also safely
under `2^53 ≈ 9 · 10¹⁵`, so JavaScript and TypeScript number arithmetic
stays exact without BigInt.

**Complexity:** `O(n)` time, `O(n)` space.
