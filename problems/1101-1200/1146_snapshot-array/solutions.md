# Solutions — Snapshot Array

## Per-Index Write Histories with Binary-Searched Snapshots

A snapshot of an array is almost entirely a copy of the previous snapshot:
between two `snap` calls typically only a few cells change. The
`SnapshotArray` class exploits that by making snapshots **virtual** —
`snap()` does nothing but increment and return a counter — and recording
instead, per index, the history of writes: a list of `(snap_id, val)` pairs
appended by `set`.

Two details keep the histories tight and correct. A write lands in the
history tagged with the snapshot currently being built, and consecutive
writes to the same index before any intervening `snap` **replace** the last
entry rather than appending — at most one entry per index per snapshot
survives, so history length tracks distinct write-snapshots, not raw `set`
calls. And because snapshot ids never decrease, every history is sorted by
construction.

`get(index, snap_id)` then binary-searches that index's history for the
rightmost entry whose snap_id is at most the query (`bisect_right` against a
sentinel tuple in Python; an explicit halving loop in Java). Its value is
what the cell held when that snapshot was taken. When the search runs off
the start — the query predates every write to the index — or the index was
never written, the answer is the initial value `0`. Indices are kept in a
hash map, so untouched cells cost nothing.

Both the Python and Java canonical solutions implement exactly this
structure. With at most `5 * 10⁴` mixed calls, each `set` an `O(1)` amortized
append and each `get` an `O(log h)` search over that index's `h` entries,
the workload stays far inside the limits.

**Complexity:** `O(1)` amortized per `set`, `O(1)` per `snap`, `O(log h)` per
`get`, `O(total writes)` space.
