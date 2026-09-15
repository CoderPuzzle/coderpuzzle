# Solutions — Find Indices of Stable Mountains

## Single pass over adjacent pairs

Stability is a purely local verdict: mountain `i` qualifies exactly when its
immediate predecessor exists and satisfies `height[i - 1] > threshold`, so no
index ever depends on anything farther than one step away. Mountain 0 has no
predecessor and can never be stable, which fixes the scan's starting point at
index 1.

One left-to-right pass over the adjacent pairs settles every verdict: whenever
the pair ending at `i` clears the threshold, `i` joins the answer. Scanning
ascending indices appends them in ascending order, matching the required
output order without any post-sorting. Every mountain is judged exactly once,
against only its own predecessor, so nothing is ever recomputed.

**Complexity:** `O(n)` time, `O(1)` space beyond output.
