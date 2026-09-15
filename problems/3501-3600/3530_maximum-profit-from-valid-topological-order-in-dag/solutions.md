# Solutions — Maximum Profit from Valid Topological Order in DAG

## Bitmask DP over Topological Order

With n ≤ 22, the whole problem fits in a subset DP: dp[mask] is the maximum profit achievable when exactly the nodes in mask occupy the first popcount(mask) positions of the ordering. From a state, the next node placed at position popcount(mask) + 1 can be any remaining node all of whose predecessors already sit in mask — that legality check is O(1) because each node's predecessors are precomputed as a bitmask pred[v], and the test is pred[node] & mask == pred[node]. The placement adds score[node] × position.

The table is swept forward over masks in increasing numeric order, which is consistent with increasing popcount, so every state a transition reads is already final. A value of −1 marks states that no valid order produces (masks that are not downward-closed under the edge relation stay unreachable) and such states are skipped, preventing them from poisoning successors. The answer is dp[(1 << n) − 1].

Two details keep it fast and correct. A fast path handles the common no-edges case in O(n log n): since every score is non-negative, the rearrangement inequality says pairing ascending scores with ascending positions is optimal, so the code sorts and multiplies directly. Otherwise the main loop costs one O(n) scan per mask, which is trivial for 2^22 states.

**Complexity:** `O(2^n · n)` time, `O(2^n)` space.
