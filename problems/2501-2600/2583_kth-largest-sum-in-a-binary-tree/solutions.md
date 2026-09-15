# Solutions — Kth Largest Sum in a Binary Tree

## Level-Order Sums and Selection

The level of a node is exactly its distance from the root, so grouping
nodes by breadth-first order groups them by level: every node dequeued
between two batch boundaries shares one distance, and its children queue
up for the next distance down. The sweep therefore never needs to track
depths explicitly — it processes the whole current batch into one running
total, then swaps the collected children in as the next batch.

Each finished batch appends one level sum to a list. Once the walk ends,
the list either has fewer than `k` entries, in which case the tree has
fewer than `k` levels and the answer is `-1`, or sorting the list
descending exposes the kth largest sum at index `k - 1`. Ties are fine:
the statement asks for the kth largest "not necessarily distinct", and a
plain sort keeps duplicates adjacent so repeated sums still count
separately toward `k`.

The traversal stays iterative on purpose: a degenerate chain runs `10⁵`
levels deep, which would blow every language's recursion budget, while a
queue only ever holds one or two levels' worth of nodes. Sums are the
one precision trap — up to `10⁵` nodes × `10⁶` per value = `10¹¹` per
level, well past 32-bit range, so Java/C++/Go/Rust accumulate in 64-bit
integers, and JS/TS stay exact because `10¹¹` sits far below the `2⁵³`
boundary where Number arithmetic stops being exact.

**Complexity:** `O(n log n)` time dominated by the sort (`O(n)` for the
traversal itself), `O(w)` extra space for the widest level.
