# Solutions — Minimize the Total Price of the Trips

## Trip Frequency Counting with Tree DP

Every trip travels the unique path between its endpoints, so the total cost before discounts is `sum(price[i] * freq[i])`, where `freq[i]` counts how many trip paths pass through node `i`. Halving node `i` saves `price[i] / 2 * freq[i]`, which separates the discount decision from the routing: compute frequencies first, then optimize discounts against them.

Frequencies come from one traversal per trip. An iterative DFS from `start` fills a parent array (stopping as soon as `end` comes off the stack), then walking back from `end` through the parent pointers increments `freq` on exactly the path nodes; the walk terminates after touching `start`, which also handles the trivial trip where start equals end. With `n <= 50` and at most 100 trips this phase is cheap.

The discount choice is the classic independent-set DP on trees. `dfs(v, p)` returns a pair — the minimum subtree cost with `v`'s price kept full versus halved — seeded with `price[v] * freq[v]` and `(price[v] // 2) * freq[v]`. A full node may sit under children of either state, contributing `min(c0, c1)` per child, while a halved node forces every child to stay full because discounts are restricted to non-adjacent nodes. The answer is the better of the two states at the root.

**Complexity:** `O(n * trips)` time, `O(n)` space.
