# Solutions — Kth Largest Element in an Array

Two ways to answer without fully sorting: either narrow in on the answer's
sorted position, or stream the array through a heap that keeps only the
top `k` values.

## Randomized Quickselect

The kth largest element is exactly the element that lands at index `n - k`
of the ascending-sorted array, so the task reduces to finding one sorted
position — no total order for the rest is needed. Quickselect maintains a
live window `[lo, hi]` that is guaranteed to contain the target index and
shrinks it one partition at a time: pick a pivot, sweep the window so every
value strictly below the pivot sits to its left, and the pivot lands at its
final sorted position (duplicates ride the right side of the split, which
keeps the partition correct when many values are equal). Afterwards only
the side of the split that still contains the target index is kept, and the
window shrinks by at least one element each round. The loop is written
iteratively over `[lo, hi]` rather than recursively.

The pivot is chosen uniformly at random from the window. A deterministic
pivot choice is what makes plain quickselect fragile — sorted or all-equal
inputs then shave off one element per partition and drive the work to
quadratic. With random pivots no fixed input can force that: every
partition shrinks the window by an expected constant fraction, so the
expected total work is linear and a quadratic run has vanishing
probability, whatever the judge's arrays look like.

**Complexity:** `O(n)` expected time — each round costs proportional to
the window size and the window shrinks geometrically in expectation; the
worst case is `O(n^2)` but only with probability tending to zero. `O(1)`
extra space: partitioning happens in place and the window is a pair of
indices.

## Min-Heap of Size k

A min-heap of exactly `k` elements always contains the `k` largest values
seen so far, with the smallest of them — the current kth largest — at the
root. The first `k` elements are heaped directly; every later element is
checked against the root before touching the heap: only a value strictly
greater than the minimum can belong to the top `k`, and it then enters by
popping the root and pushing itself. Skipping everything else is what
keeps the pass `O(n log k)` — most elements cost one comparison.

Each heap operation is logarithmic in `k`, not in `n`, so this beats fully
sorting at `O(n log n)` whenever `k` is small relative to `n`; when `k` is
small the heap rarely turns over and the pass is nearly linear. The scan
ends with the root holding the smallest of the top `k`, which is the kth
largest by rank, duplicates counted — exactly as the problem defines it.
The degenerate case `k = n` simply holds every element, and the root is
the array minimum, still the correct answer.

**Complexity:** `O(n log k)` time — `O(k)` to heapify the first `k`
elements plus at most `n - k` replacements at `O(log k)` each. `O(k)` extra
space for the heap.
