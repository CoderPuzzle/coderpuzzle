# Solutions — Maximize Fixed Points After Deletions

A candidate at original index `i` needs exactly `i - nums[i]` deletions before
it. Compatible candidates form a two-coordinate chain.

## Sort candidates and query a Fenwick maximum

Discard every index with `nums[i] > i`. For two retained fixed points, their
values must increase strictly, while their required deletion counts must be
non-decreasing. Conversely, those two conditions leave enough original
positions to retain every required element between consecutive fixed points.

Sort candidates by value and process equal-value candidates as one group. A
Fenwick tree over deletion counts stores the longest chain ending at or below
each count; delaying group updates prevents equal values from chaining. The
largest stored length is the answer.

**Complexity:** `O(n log n)` time, `O(n)` space.
