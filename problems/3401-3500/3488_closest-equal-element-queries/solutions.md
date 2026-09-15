# Solutions — Closest Equal Element Queries

## Occurrence lists + binary search per query

Group the indices of `nums` by value in one pass; because the scan visits
indices in increasing order, every group is already a sorted list of that
value's occurrences. A value whose list has length 1 can never match
another index, so its queries answer `-1` immediately.

For any other query `q`, the nearest equal element is one of `q`'s two
neighbors in its value's circular occurrence list: going counterclockwise
the closest is the previous occurrence, going clockwise it is the next
one, and any farther occurrence is farther in its own direction.
Binary-search the sorted list to locate `q`, read off the previous entry
`prev` (wrapping to the last when `q` is first) and the next entry `nxt`
(wrapping to the first when `q` is last), and reduce both gaps modulo
`n = len(nums)` so the wraparound distance across the array boundary is
measured along the circle. The answer is the smaller of
`(q - prev) mod n` and `(nxt - q) mod n`.

Each query costs one `O(log n)` search plus constant work, after the
`O(n)` grouping pass.

**Complexity:** `O(n + q log n)` time over `n` array elements and `q`
queries, `O(n)` space.
