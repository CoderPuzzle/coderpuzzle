# Solutions — K-diff Pairs in an Array

## Hash map of counts

The count over pairs is really a count over distinct values: a pair is
identified by its two values, so however often a value repeats, it enters
the same pair at most once. That collapse means one hash map from value to
its number of occurrences carries everything the scan needs — the distinct
values sit in the keys, answering "is `v + k` present?" in constant time,
and the frequencies hold the multiplicity information the `k == 0` case
asks for.

The two regimes split cleanly on `k`. When `k == 0`, a valid pair needs two
equal values at different indexes, so a value contributes exactly once when
it occurs at least twice — a third or fourth copy adds nothing, which is
the point of Example 1's note about the two 1s. When `k > 0`, a value can
never pair with itself, so the scan walks the distinct keys once and counts
each value `v` whose partner `v + k` is also a key; looking only upward
counts every couple exactly once.

**Complexity:** `O(n)` time, `O(n)` space.
