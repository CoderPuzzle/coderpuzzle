# Solutions — Find the Prefix Common Array of Two Arrays

## Shared frequency counters

A value is common to both arrays precisely when it has been seen twice —
once in A, once in B. That turns the whole problem into bookkeeping: walk
one shared pass over the two arrays, bump a counter for every value read,
and each time a counter reaches 2 one more value has become common, so the
running total rises by exactly one. Recording that total after every index
writes out C directly.

Because A and B are permutations of 1..n, every value occurs exactly once
per array, so a counter reaches 2 exactly once — the moment its value has
appeared in both prefixes. The self-meeting case `A[i] == B[i]` falls out
cleanly too: such a value cannot have occurred anywhere earlier, so its two
bumps within the same step raise it from 0 to 1 and then to 2, contributing
exactly one common value overall.

**Complexity:** `O(n)` time, `O(n)` space.
