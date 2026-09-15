# Solutions — Design Linked List

Every operation here is index arithmetic on a chain: `get`, `addAtIndex` and
`deleteAtIndex` all name a position, and the only questions are whether the
position exists and which cell sits in front of it. A length counter answers
the first with one comparison, and a sentinel head — a cell that is always
present and never carries data — removes the special case at position 0, so
every operation becomes the same walk.

## Singly Linked List with Sentinel Head

The list is one chain of cells (`val` plus `next`) hanging off a sentinel
head, plus a `size` counter. All three inserting methods funnel through
`addAtIndex`: `addAtHead(val)` is `addAtIndex(0, val)`, `addAtTail(val)` is
`addAtIndex(size, val)`, and `addAtIndex` itself first applies the boundary
rules from the statement — an index greater than the length is a no-op, an
index equal to the length appends — then walks `index` cells down from the
sentinel to the cell in front of the position and splices the new cell in
behind it. `deleteAtIndex` repeats the same walk and unlinks the cell it lands
after.

`get` bounds-checks against `size` — any index at or past the length is
invalid and returns -1 — and otherwise reports the value of the cell one step
past its walk. Because the sentinel is a real cell, walking to "the cell in
front of position `index`" is exactly `index` steps for every `index` from 0
through `size`, front insert included; no operation branches on whether the
position happens to be an end.

Each operation pays only for its own walk: `index` steps to reach a position,
so operations at the head are constant time while an append or a read at the
tail pays the full length — there is deliberately no tail pointer, because the
one sentinel already keeps every case uniform. The chain holds one cell per
live value.

**Complexity:** `O(index)` time per operation (`O(1)` at the head), `O(n)`
space.
