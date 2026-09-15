# Solutions — Subtree Inversion Sum

## Tree DP with Inversion Parity and Distance

An inversion at node u multiplies every value in u's subtree by −1, so the final sign of any node's value is the parity of the number of inverted ancestors it has. The only constraint links inversions on one root-to-node chain: two nested inversions must be at least k edges apart. That suggests the state dp[u][flip][d] — the maximum subtree sum of u given flip (the parity of sign flips applied from ancestors) and d, the distance in edges from u up to its nearest inverted ancestor, capped at k because any distance ≥ k behaves identically (another inversion is already allowed).

The DP is computed bottom-up in reverse BFS order, so no recursion is needed for n up to 5 × 10^4. For each node, the children's tables are summed per (flip, d) pair. Then, for each (flip, d), the "don't invert" option takes sign s = ±1 from flip and moves to the child row at distance d + 1 (capped at k); when d ≥ k, the node may additionally invert itself, which uses the opposite-parity child row at distance 1 below the new inversion, and the better of the two options is kept. The answer is dp[0][0][k] — the root sees no recent inversion, so it is free to invert.

Capping d at k is what bounds the table at 2 × (k + 1) entries per node and makes the whole DP O(n·k) even when k exceeds the tree height; k = 1 degenerates to "every node may invert". Since values can be negative, the code always compares against the don't-invert branch rather than assuming inversion helps.

**Complexity:** `O(n · k)` time, `O(n · k)` space.
