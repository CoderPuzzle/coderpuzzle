# Solutions — Design Event Manager

A direct reading of `pollHighest` scans every active event for the maximum
priority, breaking ties toward the smallest eventId. That costs `O(k)` per
poll, and with up to `10⁵` calls over `10⁵` events the worst case is `10¹⁰`
comparisons. A heap brings each poll down to `O(log)` — but now
`updatePriority` has to change the priority of an entry already sitting in
the heap, which heaps are not built to do cheaply.

## Lazy-deletion heap with a live-priority map

The trick is to never update a heap entry in place. `updatePriority` records
the new priority in a map and pushes a fresh `(priority, eventId)` entry
onto the heap, leaving the old entry behind. `pollHighest` then pops from
the heap and checks each popped entry against the map: if its stored
priority still equals the live value, the entry is current and that event
is the answer; otherwise it is a stale leftover of an earlier update and is
discarded. Each event has at most one live entry, so a stale entry is
eventually popped and dropped for good. This lazy deletion keeps every
operation logarithmic.

The heap key carries both tie-breaks at once. Entries are ordered by
`(priority, -eventId)`: the max-heap surfaces the highest priority first,
and when two events share a priority, the larger `-eventId` — that is, the
smaller eventId — comes first. EventIds and priorities both fit in 32 bits
and never exceed `10⁹`, so every arithmetic step is exact even in
JavaScript's Number type (well below `2⁵³`).

Each `updatePriority` and `pollHighest` does constant bookkeeping plus one
heap operation. The heap can hold one stale entry per update in the worst
case, so its size is bounded by the initial events plus the total number of
`updatePriority` calls.

**Complexity:** `O(log(E + U))` amortized per `updatePriority`/`pollHighest`,
`O(E + U)` space, where `E` is the initial event count and `U` the number of
`updatePriority` calls.
