# Solutions — Find the Maximum Sum of Node Values

## Even-flip parity greedy

Only the parity of how many times each node's value gets XORed with `k` matters, and every operation toggles the parity of exactly two endpoints. Since the graph is a connected tree, any even-cardinality subset of nodes can be realized: pair up the chosen nodes arbitrarily and apply operations along the paths between each pair — interior path nodes get toggled twice, cancelling out. The edge list is therefore irrelevant beyond guaranteeing connectivity.

The problem reduces to choosing an even number of nodes to XOR, maximizing the total. Compute each node's delta `(x ^ k) - x`; taking a node is worth its delta. The optimal even-sized pick is greedy: take every positive delta, giving `base = sum(nums) + sum(positives)`.

If the count of positive deltas is odd, one adjustment is forced — either drop the smallest positive delta or add the largest non-positive delta (which costs `-d >= 0`). Take the cheaper of the two penalties and subtract it from `base`. `n >= 2` guarantees a partner node always exists, and a delta of exactly 0 in the non-positive bucket is a free fix when present.

**Complexity:** `O(n)` time, `O(n)` space.
