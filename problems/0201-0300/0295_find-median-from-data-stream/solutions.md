# Solutions — Find Median from Data Stream

## Two Heaps Split at the Median

A running median needs the middle of the sorted order, and only the middle. The `MedianFinder` therefore splits the stream in two: every number at or below the dividing line goes into a **max-heap** (`low`), every number above it into a **min-heap** (`high`). The two values an answer needs — the largest of the smaller half and the smallest of the larger half — sit on the heap tops, one peek away.

`addNum` routes every number through both heaps: push onto `low`, move `low`'s maximum across to `high`, and if `high` then holds more elements than `low`, move `high`'s minimum back. This round trip looks redundant but is what keeps the invariant "`low`'s maximum ≤ `high`'s minimum, sizes within one" true no matter where the new value belongs — one comparison-free dispatch instead of three cases. `findMedian` then averages the two tops for an even count, or returns `low`'s top alone when it holds the extra element.

Medians of integer streams are integers or exact halves, so the double arithmetic is exact. With `5 * 10⁴` calls, each a constant number of `O(log n)` heap operations, the workload stays tiny.

**Complexity:** `O(log n)` per `addNum`, `O(1)` per `findMedian`, `O(n)` space.
