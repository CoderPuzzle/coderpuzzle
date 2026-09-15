# Solutions — Fair Distribution of Cookies

## Backtracking with Symmetry and Bound Pruning

With at most 8 bags and at most 8 children, the search space of assignments is small enough to enumerate directly: process bags one at a time and try handing each bag to each child in turn. The state is the vector of per-child totals plus the running maximum; when the last bag is assigned, the running maximum is the unfairness of that complete distribution, and the answer is the minimum over all leaves.

Two prunings keep the recursion fast. First, bound pruning: if the running maximum already meets or exceeds the best complete distribution found so far, adding more bags can only keep it the same or make it worse, so the branch is abandoned immediately. Second, symmetry breaking: when placing the current bag, two children currently holding identical totals are interchangeable — giving the bag to either leads to isomorphic subtrees — so only the first child with any given total is tried, tracked with a small per-level set of already-tried totals. This collapses the `k^8` worst-case branching dramatically whenever children's totals coincide (as they do early on, when several children still have 0).

The recursion needs no memoization because the cost being minimized is the final maximum, not a per-state value that composes cleanly, and the pruned tree is tiny for the given constraints. Edge cases: `k` may equal the number of bags (each child can get one bag, so the answer is at most `max(cookies)`), and the initial `best` of infinity guarantees the first complete leaf always improves on it.

**Complexity:** `O(k^n)` time worst case (heavily cut by pruning), `O(n + k)` space for the recursion stack, child totals, and tried-total sets.
