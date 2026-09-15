# Solutions — Maximum Partition Factor

## Binary search on the factor

A split achieves factor D exactly when every pair of points closer than D
lands in different groups — in other words, when the conflict graph that
connects each pair with Manhattan distance less than D is two-colorable.
That feasibility test is monotone: raising D only adds edges, so once a
threshold fails it keeps failing. The answer is therefore the largest
threshold whose conflict graph is bipartite, and binary search over
candidate thresholds finds it. The candidates need not be every integer:
the factor of any split is either 0 or one of the inter-point distances,
so probing the sorted O(n²) distance values keeps the probe count at
O(log n).

Each probe is a standard bipartiteness pass. Collect adjacency lists from
the pairs closer than the probed threshold, then walk every component with
an explicit stack, assigning alternating colors and reporting failure the
moment an edge's endpoints collide. Two boundary shapes resolve without
searching. With n = 2 both groups are singletons, so the factor is 0 by
definition; and any feasible coloring can always be realized as two
non-empty groups, because moving one vertex to the other side never brings
a close pair into a single group — removals only prune pairs.

**Complexity:** `O(n² log n)` time, `O(n²)` space.
