# Solutions — Delete Nodes From Linked List Present in Array

## Hash set plus a dummy-headed pass

Unlike removing one fixed value, the matches here are defined by a whole
array, so the first move is turning `nums` into a hash set: building it
costs one pass over the `m` entries and buys constant-time membership
tests for the entire walk. The head itself may be a node to remove — and
so may every node behind it — so a cursor anchored at `head` has nothing
stable to stand on while the first matches fall away.

A dummy head planted in front of the list fixes that: `dummy.next` always
addresses the first survivor, whoever it turns out to be, and deleting
the original head degenerates into the same operation as deleting any
other node — unlinking the successor of some node. The walk keeps
`current` on a kept node and only ever inspects `current.next`: when the
successor's value is in the set, one pointer write skips it and the
cursor deliberately stays put, because the node behind a match may match
too; only a differing value steps the cursor forward. When the walk runs
off the end, `dummy.next` is the new head.

Every node is read once and every removal costs one pointer write, so
after the set build the sweep is a single pass over the list; the memory
footprint is the set itself and does not depend on how much of the list
dies.

**Complexity:** `O(n + m)` time, `O(m)` space.
