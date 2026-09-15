# Solutions — Most Frequent IDs

## Lazy max-heap of snapshots

Each step moves exactly one ID's count, so the running maximum changes only
through that ID. A max-heap of `(count, id)` snapshots exploits this without
ever needing to find and erase an ID's previous snapshot: after applying the
delta, push the touched ID's new pair, then pop from the top while the entry
there no longer matches the live count table. Whatever surfaces is the true
maximum, because every entry below it is either fresh or will itself be
popped before it can ever reach the top.

Each step contributes one push, and every entry is popped at most once, so
the whole run does `O(n)` heap operations — `O(n log n)` time for `n` steps.
A fresh entry with count 0 can only top the heap when no ID holds any items,
which is exactly when the answer should be 0, so the emptied-collection rule
needs no special case.

Counts accumulate freely: with `n` up to `10⁵` and `|freq[i]|` up to `10⁵`,
one ID can hold `10¹⁰` copies, beyond 32-bit range — every port carries
counts in 64-bit integers (JS/TS stay exact in `Number`, far below `2⁵³`).

**Complexity:** `O(n log n)` time, `O(n)` space.
