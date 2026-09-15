# Snapshot Array

## Description

Implement a `SnapshotArray` that supports the following interface:

- `SnapshotArray(int length)` Initializes an array-like data structure with
  the given length. Initially, each element equals `0`.
- `void set(index, val)` Sets the element at the given `index` to be equal to
  `val`.
- `int snap()` Takes a snapshot of the array and returns the `snap_id`: the
  total number of times we called `snap()` minus 1.
- `int get(index, snap_id)` Returns the value at the given `index`, at the
  time we took the snapshot with the given `snap_id`.

### Example 1

```text
Input:
["SnapshotArray", "set", "snap", "set", "get"]
[[3], [0, 5], [], [0, 6], [0, 0]]
Output: [null, null, 0, null, 5]
Explanation:
SnapshotArray snapshotArr = new SnapshotArray(3); // set the length to be 3
snapshotArr.set(0, 5);  // Set array[0] = 5
snapshotArr.snap();     // Take a snapshot, return snap_id = 0
snapshotArr.set(0, 6);
snapshotArr.get(0, 0);  // Get the value of array[0] with snap_id = 0, return 5
```

### Constraints

- `1 <= length <= 5 * 10⁴`
- `0 <= index < length`
- `0 <= val <= 10⁹`
- `0 <= snap_id <` the total number of times we call `snap()`
- At most `5 * 10⁴` calls will be made to `set`, `snap`, and `get`.

## Hints

### Hint 1

Copying the whole array on every `snap` is what makes snapshots expensive —
and almost all of the copies are identical to their predecessor. Record
instead **what changed**: each index only needs the sequence of values written
to it, tagged with the snapshot in effect at the time of the write.

### Hint 2

Give each index a history of `(snap_id, val)` pairs. A `set` appends to one
index's history only; `snap()` just increments a counter — the snapshot is
virtual, materialized by the histories themselves.

### Hint 3

A history is sorted by construction (snapshot ids never decrease), so
`get(index, snap_id)` is a binary search for the rightmost entry whose
snap_id is at most the query — that entry's value is what the index held at
that snapshot; if none exists the index was never written and the answer is
the initial `0`. Writes landing inside the same snapshot replace the last
entry instead of appending.

### Follow-up

Each index's history grows only with writes, not with snapshots — what does
that say about the total space across `5 * 10⁴` mixed calls?
