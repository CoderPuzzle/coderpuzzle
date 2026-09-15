# Solutions — Maximum Star Sum of a Graph

## Greedy Neighbor Selection per Center

A star graph is fixed by choosing its center; the only freedom is which subset of at most `k` neighbors joins it. Because neighbor values simply add up, the best subset for a given center is obtained greedily: sort that node's neighbor values in descending order and take them one by one while they are positive and fewer than `k` have been taken. A non-positive neighbor can only lower the sum, so the loop stops at the first value `<= 0` — the center alone is always a legal star, which is why the search is initialized with `max(vals)` and never with 0 or an empty-sum sentinel.

The implementation builds, for each node, the list of its neighbors' _values_ (not neighbor indices) while reading the edges, so no second lookup is needed later. Each adjacency list is then sorted in reverse order, the top positive prefix of length at most `k` is accumulated onto the node's own value, and the running maximum over all centers is returned.

Edge cases fall out naturally: with `k = 0` or all-negative neighborhoods every center contributes just its own value, so the answer is negative when it must be (as in the single-node `[-5]` example); an empty edge list makes every node an isolated center. Sorting dominates the work — the total size of all adjacency lists is `2|E|` — and the per-node extra storage matches the degree structure of the graph.

**Complexity:** `O(n + E log E)` time, `O(n + E)` space.
