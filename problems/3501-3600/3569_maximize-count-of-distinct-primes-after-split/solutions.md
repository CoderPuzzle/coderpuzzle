# Solutions — Maximize Count of Distinct Primes After Split

## Prime occurrence intervals with a max-prefix event tree

The count that a split maximizes is `|prefix primes| + |suffix primes|`, and
a prime value contributes to both sides exactly when the split position `k`
falls inside its occurrence span: `first < k <= last`, where `first` and
`last` are its outermost occurrence indices. So every answer decomposes into
`(distinct prime values present) + (largest number of prime spans covering
one split position)`. Each span `[first + 1, last]` is maintained in an
event array over the `n - 1` split positions — `+1` at `first + 1`, `-1` at
`last + 1` — and a segment tree whose nodes carry the segment sum and the
maximum zero-anchored prefix sum turns a point update of either event into
`O(log n)` work while the root always holds the deepest overlap.

Each update `nums[idx] = val` touches only the sorted occurrence lists of
the old and new values. When `idx` was an outer occurrence of the old value
(or removes it entirely), the value's span is popped with two point updates
and, if at least two occurrences remain, the shrunken span is pushed; the
new value is mirrored, entering or leaving the distinct-prime counter as its
list empties or appears. Both lists stay sorted via binary-search
insertion/removal, so `first` and `last` are the list's endpoints, and the
per-query work is a constant number of tree updates around `O(log n)` of
list bookkeeping. Values are below `10⁵` and answers below `2 * 10⁵`, so
32-bit integers never overflow.

**Complexity:** `O(n + q log n)` time, `O(n)` space.
