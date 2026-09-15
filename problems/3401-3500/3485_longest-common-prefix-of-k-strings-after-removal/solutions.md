# Solutions — Longest Common Prefix of K Strings After Removal

## Trie with Per-Depth Best Two Candidates

Insert every word into a trie where each node stores `cnt`, the number of words passing through it; a node at depth `d` then represents a common prefix of length `d` shared by exactly `cnt` words. Ignoring removals, the answer would be the deepest node with `cnt >= k`. Removing word `i` subtracts 1 from every node on its root-to-leaf path, so after removal a node still supports `k` strings iff either it lies on the removed word's path with `cnt >= k + 1`, or it lies off the path with `cnt >= k`.

The off-path candidates cannot be recomputed per query, so precompute for every depth the two best nodes: `top1[d]` and `top2[d]` are the first two distinct trie nodes at depth `d` with `cnt >= k`. For a removed word whose path avoids `top1[d]`, that node still has `cnt >= k` copies; if the path covers `top1[d]`, then `top2[d]` (a different node, necessarily off the path) is the witness. Hence the best off-path depth is the deepest `d` where `top2[d]` exists or `top1[d]` is not on the removed path.

Each query walks its word once, stamping the visited nodes with a timestamp (so marks from previous queries never collide), recording `big` = the deepest on-path depth with `cnt >= k + 1`; then it scans depths from the maximum downward over the depths where `top1` exists, stopping at the first acceptable off-path depth `fb`. The answer is `max(big, fb)`. If `n - 1 < k` every removal leaves too few words and the result is 0 for all indices, handled up front.

Edge cases: duplicate words (they share the whole path, so `cnt` at the leaf can reach `k + 1` and the word's own removal still leaves the others), `k = 1` (the deepest surviving prefix is essentially the longest other word), and `top2` being absent at every depth (only one qualifying node per depth, so the answer collapses to the on-path candidate).

**Complexity:** `O(S)` time, `O(26 * S)` space, where `S` is the total length of all words.
