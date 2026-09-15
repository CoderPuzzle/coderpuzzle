# Solutions — Minimum Absolute Difference Between Elements With Constraint

## Sweep right with an ordered set over the eligible prefix

Only pairs (i, j) with i < j and j - i >= x matter, because a pair's two
elements are distinct positions and absolute differences are symmetric.
Holding j fixed, every legal partner is a member of the prefix
nums[0 .. j - x], so sweeping j left to right turns the question into:
what is the value in that prefix closest to nums[j]? Feeding one eligible
value into an ordered set at each step keeps the query to two binary
searches — the successor of nums[j] and its predecessor, exactly what
lower_bound/upper_bound give on std::set (TreeSet.floor/.ceiling,
bisect_left/bisect_right) — and each search bounds one candidate
difference. The minimum over all steps is optimal because every valid pair
(i, j) is examined when the sweep reaches j.

An x of 0 degenerates, since "two elements" still means two distinct
indices: folding x up to 1 (`sep = max(x, 1)`) preserves the answer for
every input while keeping the same insert-then-query code shape valid. The
realization below stores the prefix as counts over the sorted distinct
values plus a Fenwick tree over those ranks; predecessor and successor are
the count-th and count+1-th stored values recovered by a binary descent,
which reproduces lower_bound/upper_bound without any library set. Every
stored entry entered before the current element queried it, so equal
values compare correctly across distinct indices, `0` results are real
duplicates at legal distance, and all values and their differences stay
inside signed 32-bit range (below 10^9). With n <= 10^5 the sweep performs
O(n) tree walks of O(log n) steps each.

**Complexity:** `O(n log n)` time, `O(n)` space.
