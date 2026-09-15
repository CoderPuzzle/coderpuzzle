# Solutions — Reorder List

## Middle, reverse, interleave

The target order alternates the front half of the list with the back half read backwards, so the whole job is three walks. A slow pointer stepping one node and a fast pointer stepping two end together with slow on the last node of the front half; unhooking `slow.next` splits the list into the two halves without touching a single value. The back half is reversed in place with the usual rotation — each node's `next` is aimed at `prev` while a cursor keeps the unconsumed remainder — producing a second chain that reads the original back half backwards.

The two chains are then woven together: each front node hands its successor to the current back node and takes that back node in its place, so one node from each half alternates down the result until the back chain, never longer than the front, runs out. Every operation is a `next` rewrite — no node is allocated and no `val` is changed, exactly what the statement demands — and the judge here observes the return value rather than the mutated argument, so the same `head` handle, still `L0`, is returned at the end.

Rust's nodes are owned `Box`es rather than shared pointers, so each splice takes its node out with `take` and hands it to its new neighbour, and the middle is found by measuring the length instead of racing two cursors a chain of `Box`es cannot share; the writes become moves, but the algorithm is the identical three steps in all seven languages.

**Complexity:** `O(n)` time, `O(1)` extra space.
