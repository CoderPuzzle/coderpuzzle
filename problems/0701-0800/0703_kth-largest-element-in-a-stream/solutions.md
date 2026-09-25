# Solutions — Kth Largest Element in a Stream

## Size-capped Min-Heap

Answering "kth largest" after every insertion does not require the whole sorted
pool — only its top `k` elements. Anything outside the top `k` can never
re-enter it, because later insertions only raise the bar. The `KthLargest`
class therefore keeps a **min-heap of exactly `k` elements**: the current `k`
largest scores.

The heap's minimum — its root — is then precisely the kth largest of the whole
pool. `add` offers the new score, and if the heap has grown to `k + 1` the
root is the element that just fell out of the top `k`; polling it restores the
size invariant. The answer is the new root, read in constant time. A score
smaller than the root is still pushed first and immediately popped back, which
keeps the logic free of a comparison branch.

Construction establishes the same invariant by heapifying all of `nums` and
polling until only `k` elements remain. (When `nums` holds fewer than `k`
scores, the heap is simply smaller and grows toward `k` on the first `add`
calls, as the constraints allow.)

![With k = 3 over [4,5,8,2] and then the adds 3, 5, 10, 9, 4, the size-3 min-heap pops each overflow minimum and its root reads out 4, 5, 5, 8, 8.](figures/solution-minheap-root-reads.svg)

Both the Python and Java canonical solutions implement this structure
(`heapq` and `PriorityQueue` are both binary min-heaps). With at most `10⁴`
adds and `k ≤ 10⁴ + 1`, each operation costs `O(log k)` and the total
workload is negligible.

**Complexity:** `O(log k)` time per `add` with an `O(n + (n - k) log n)`
build, `O(k)` space.
