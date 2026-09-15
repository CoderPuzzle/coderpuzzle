# Solutions — Maximum Number of K-Divisible Components

## Greedy Subtree-Sum Cutting

Root the tree at node 0 and compute every subtree's sum bottom-up. Whenever a finished subtree has a sum divisible by `k`, cut the edge above it: cutting is always safe. The reason is exchange-flavored — the total of all values is divisible by `k` by assumption, so if a subtree's sum is divisible by `k`, the rest of the tree's sum is too, and separating the two preserves divisibility on both sides; conversely, if a subtree's sum is not divisible by `k`, no valid split can ever separate its nodes from the parent side, because each component must be divisible on its own. Cutting every divisible subtree therefore never forecloses a better later cut and strictly grows the component count.

The implementation is two linear passes. A stack-based DFS from the root records parents and an order with parents before children; then that order is processed in reverse, so every node's subtree is complete before its parent reads it. If `subtree[u] % k == 0`, one component is counted and the sum is discarded (the edge is cut); otherwise the sum is merged into the parent and the decision is deferred upward.

After the pass, the one remaining component containing the root is added to the count. Its sum is necessarily divisible by `k` — every cut removed a divisible piece, and the original total was divisible — which is why the root needs no explicit check. Values of zero and large sums up to `3 x 10^13` are handled naturally by Python integers.

**Complexity:** `O(n)` time, `O(n)` space.
