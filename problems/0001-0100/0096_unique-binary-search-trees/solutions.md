# Solutions — Unique Binary Search Trees

## Bottom-up Catalan recurrence

A BST on the values `1` through `n` is pinned down by its root: choose value `root`, and the smaller values must form the left subtree while the larger ones must form the right. Which shapes a subtree can take depends only on how many values it holds, never on the values themselves — any `k` ordered values yield the same `g[k]` shapes — so every left shape pairs with every right shape and the counts multiply. Writing `g[k]` for the number of BSTs on `k` ordered values, `g[n]` is the sum of `g[root - 1] * g[n - root]` over every root choice, seeded with `g[0] = 1` for the empty tree. This is the Catalan recurrence: `g[n]` is the n-th Catalan number.

The code fills `g[0..n]` in order of node count, so both factors of each product are already final by the time they are read — no recursion, no memo, no recursion-depth limit to think about, and the whole answer for `n <= 19` is one 20-entry table walked by a double loop.

Nothing in the computation leaves 32-bit range: the table tops out at `g[19] = 1767263190` and the largest product ever formed is `g[0] * g[18] = 477638700`, both inside `2^31 - 1`, so the fixed-width ports accumulate in plain `int` without widening. The closed form `(2n choose n) / (n + 1)` reaches the same number in `O(n)` multiplications, but its central binomial — 35345263800 at `n = 19` — has already overflowed 32-bit by `n = 17`, a trap the table recurrence never approaches.

**Complexity:** `O(n²)` time, `O(n)` space.
