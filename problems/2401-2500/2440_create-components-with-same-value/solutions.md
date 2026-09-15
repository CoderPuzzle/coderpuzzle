# Solutions — Create Components With Same Value

## Divisor Enumeration with Subtree-Sum Counting

If the tree is cut into `k` equal-value components, each component must be worth `total / k`, so `k` is forced to be a divisor of the total node-value sum. Conversely, for a candidate component value `v = total / k`, the tree splits into `k` components of value `v` exactly when precisely `k` nodes have a subtree sum divisible by `v`. The forward direction holds because the topmost node of any component owns a subtree that decomposes entirely into whole components (nothing below it can cross the cut above it), so its subtree sum is a multiple of `v`; and any other node's subtree contains a proper, nonempty slice of its own component worth strictly between 0 and `v`, ruining divisibility. The reverse direction is the matching greedy: accumulating sums bottom-up and cutting whenever the running total reaches `v` succeeds precisely when those `k` divisible nodes exist.

Rooting the tree at node 0, one iterative DFS produces a visitation order whose reverse is a post-order, and a single backward sweep over it accumulates every subtree sum in `O(n)`. Divisors of `total` are enumerated by trial division up to `sqrt(total)`, each contributing both `d` and `total/d`. Candidates are then tried from the most components (`k` large, so deletions `k - 1` are maximized) down to one, returning the first that validates — since we want the maximum number of deleted edges, the first hit is optimal.

Two practical guards keep the check honest. A candidate value smaller than the single largest node value is rejected immediately, because no component can absorb a node bigger than the target. And the acceptance test counts subtree sums divisible by `v` and demands the count equal `k` exactly — a count above `k` means the divisible nodes overlap within fewer than `k` realizable pieces, so that split does not exist.

**Complexity:** `O(sqrt(S) + n·d(S))` time, `O(n)` space — with `S` the total node-value sum and `d(S)` its divisor count.
