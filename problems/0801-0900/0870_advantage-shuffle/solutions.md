# Solutions — Advantage Shuffle

## Greedy Assignment with a Fenwick Tree

This is Tian Ji's horse race: to win as many head-to-head comparisons as possible, each `nums2[i]` should be answered with the smallest unused `nums1` value that still beats it, preserving larger values for tougher opponents; when nothing remaining wins, sacrifice the smallest unused value. The statement makes this canonical strategy the required output, so implementing it exactly also produces the unique expected answer.

The multiset of unused values is kept in a Fenwick tree indexed by rank in the sorted copy of `nums1`, with every slot initialized to 1 and zeroed when its value is spent. For each `nums2[i]` in order, `bisect_right` counts how many remaining values are less than or equal to `nums2[i]`; a binary-lifting descent over the tree then selects the (count + 1)-th smallest remaining value — by construction the smallest one strictly greater than `nums2[i]`. If that rank exceeds the tree's size, no remaining value wins, and the overall smallest unused value is taken instead. The chosen rank is then decremented in the tree so it cannot be reused.

Each query and each update costs `O(log n)`, and sorting the values up front costs `O(n log n)`, so the whole scan runs in `O(n log n)`. `bisect_right` is what makes the comparison strict — it places equal values on the "not greater" side — and the rank-overflow branch is exactly the fallback for an opponent that dominates everything left.

**Complexity:** `O(n log n)` time, `O(n)` space.
