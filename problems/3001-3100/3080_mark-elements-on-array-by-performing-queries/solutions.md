# Solutions — Mark Elements on Array by Performing Queries

## Sorted sweep with a monotone pointer

Marking never unmarks, so the "k smallest unmarked elements" steps consume the
array in one direction. Sort the indices once by `(nums[i], i)` — value first,
index breaking ties, exactly the statement's order — and walk that list with a
single pointer that only ever moves forward. A query first marks its named
index (if still unmarked), then advances the pointer until it has marked `k`
more unmarked entries or reached the end; entries already marked by name are
stepped over, and since a position is never revisited the whole run does
`O(n)` pointer work across all queries combined.

The sum of unmarked elements is kept as a running total, reduced by each
value as it is marked. With `n` up to `10⁵` and `nums[i]` up to `10⁵` the
total starts as high as `10¹⁰`, beyond 32-bit range, so every port carries it
in a 64-bit accumulator (JS/TS stay exact in `Number`, far below `2⁵³`).

**Complexity:** `O(n log n + m)` time, `O(n)` space.
