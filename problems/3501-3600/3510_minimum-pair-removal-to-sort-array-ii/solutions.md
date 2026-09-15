# Solutions — Minimum Pair Removal to Sort Array II

## Heap-guided linked-list simulation

The operation is fully deterministic — always the leftmost minimum-sum
adjacent pair — so the answer is whatever this forced simulation produces.
A naive implementation that rescans the whole array after every merge is
`O(n²)`, which is far too slow for `n` up to `10⁵`. The code instead keeps
the survivors in a doubly linked list over the original indices, plus a
min-heap of `(sum, left, right)` for every current adjacent pair.

Each merge folds the right node into the left one, so the surviving indices
always keep their original order; the leftmost pair is therefore the one
with the smallest left index, which the heap's tie-break on `(sum, left)`
picks out. A heap entry is only valid while its left node is alive and still
points at the recorded right neighbour, so stale entries (pairs that were
merged away, or whose sum changed because one side grew) are simply skipped
when popped. Merging a valid pair updates only the two adjacencies around
it, and a running "bad count" of adjacent descents tells us in `O(1)`
whether the array is already non-decreasing — the loop stops as soon as the
count hits zero. Merged values can grow to `n * 10⁹`, so all sums and values
use 64-bit integers.

**Complexity:** `O(n log n)` time, `O(n)` space.
