# Solutions — Number of Ways to Assign Edge Weights I

## Max depth, then half of everything

Weights come from `{1, 2}`, and adding 2 never changes a sum's parity — so
an assignment along the path to a deepest node `x` is odd-cost exactly when
an **odd number of its `d` edges carry weight 1**; the 2s are free filler.
Counting subsets of `d` items with odd size is textbook: there are
`2^(d-1)` of them (pair every odd subset with its complement toggle of the
first edge, or sum `C(d,1) + C(d,3) + ...`). Since `n >= 2`, the maximum
depth is at least 1 and the formula applies directly.

What remains is finding `d`, the edge-depth of the deepest node. One
traversal from the root suffices: build the adjacency lists, walk with an
explicit stack (a degenerate chain of `10⁵` nodes would overflow a naive
recursive DFS), and track the maximum depth seen. The result is
`2^(max_depth - 1) mod 10⁹ + 7`, computed by repeated doubling — each
intermediate stays below `2·10⁹`, so 64-bit arithmetic (exact `Number`
doubling in JavaScript) is safe everywhere.

**Complexity:** `O(n)` time, `O(n)` space.
