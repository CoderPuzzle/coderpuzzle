# Solutions — Time Based Key-Value Store

## Hash-Map of Histories with Binary Search

A `get` must return the value written for its key at the largest timestamp not
greater than the query — a newest-at-or-before lookup. The `TimeMap` class
splits the problem along its two axes. A **hash map keyed by the store key**
isolates the history: each key owns parallel `values` and `stamps` lists, so a
query never touches other keys' entries. And because `set` timestamps are
strictly increasing, appending keeps every history sorted by timestamp without
any re-sorting — the structure the second axis needs falls out of the write
pattern itself.

`get` binary-searches the key's `stamps` for the first entry strictly greater
than `timestamp` (`bisect_left(stamps, timestamp + 1)` in Python; an explicit
halving loop computing the same boundary in Java). The entry one position
before that boundary is the newest write at or before the query. Two empty
cases collapse into the same guard: a key that was never written has no
history at all, and a query that predates every write for its key lands
before the first entry — both return `""`, the sentinel the interface defines
for "no value".

Both the Python and Java canonical solutions implement exactly this structure.
With at most `2 * 10⁵` calls — each `set` an `O(1)` amortized append, each
`get` an `O(log n)` search over that key's history — the workload stays far
inside the limits.

**Complexity:** `O(1)` amortized per `set`, `O(log n)` per `get` (`n` = writes
for that key), `O(n)` total space.
