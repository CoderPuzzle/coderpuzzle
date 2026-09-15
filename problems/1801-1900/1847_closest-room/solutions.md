# Solutions — Closest Room

## Offline queries with a growing sorted id list

Answering queries offline in decreasing order of `minSize` removes the size constraint from each individual query. Rooms are likewise ordered by decreasing size, and a pointer walks that list inserting each room's id into a sorted id list as the query threshold falls — a room qualifies for the current query exactly when its size is at least `minSize`, and once inserted it stays valid for every later (smaller) threshold. Each room is inserted exactly once, so the per-query work reduces to a closest-value lookup.

That lookup is `bisect_left` on the sorted ids for the preferred room number: the nearest candidates are the elements just below and just above the insertion point. Both are compared as `(absolute difference, id)` pairs, and sorting those pairs picks the smaller id automatically whenever the distances tie. If the id list is empty, no room meets the size requirement and the answer is `-1`. Answers are written back through the saved query indices, so the original order is preserved.

The insertion uses `insort` on a plain Python list: a logarithmic binary search followed by element shifting, which is linear in the list length in the worst case. The binary searches are `O(log n)` each, but the shifting makes the worst-case total quadratic in the number of rooms — acceptable here because shifting is a fast contiguous memory move and the queries (`k` up to 10^4) are far fewer than rooms (`n` up to 10^5). A balanced structure such as a sorted list would restore `O(n log n + k log n)` if needed.

**Complexity:** `O(n^2 + k log n)` time, `O(n + k)` space.
