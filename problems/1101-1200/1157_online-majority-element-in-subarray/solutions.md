# Solutions — Online Majority Element In Subarray

## Majority Segment Tree plus Position-List Binary Search

The constraint `2 * threshold > right - left + 1` is the load-bearing fact: an element reaching the threshold holds strictly more than half the subarray, so **at most one** answer exists per query. That splits the work into proposing the candidate and verifying it.

Proposing is where Boyer-Moore voting earns its segment tree. A node storing `(candidate, surplus)` for its range — the survivor of pairing off unequal neighbors — merges in constant time: equal candidates pool their surpluses, otherwise the heavier one survives with the difference, and a perfect tie leaves `(0, 0)` (safe, since `arr[i] >= 1` makes `0` a non-value). Both canonical solutions fold children strictly left-to-right, and the range query visits `O(log n)` nodes. The crucial property: a strict majority of a range is never eliminated by any sequence of cancellations, so if an answer exists, the fold returns it.

Verification handles the fold's one failure mode — with no strict majority the survivor is arbitrary. Each value keeps its sorted list of positions (built in one pass); occurrences in `[left, right]` are `lowerBound(right + 1) - lowerBound(left)` — two binary searches in Python (`bisect_left`) and Java (hand-rolled, since the lists are boxed). If the count reaches `threshold` the candidate is the answer, otherwise no element qualifies and the query returns `-1`.

An alternative canonical route is randomization — sample random indices in `[left, right]`; any true majority is hit with probability > 1/2 per draw — but the segment tree is deterministic, which suits exact judging, and answers in `O(log² n)` worst case rather than with high probability.

**Complexity:** `O(n)` construction (`O(n log n)` in Java due to boxed position lists), `O(log n)` nodes per query fold plus `O(log n)` per binary search, `O(n)` space.
