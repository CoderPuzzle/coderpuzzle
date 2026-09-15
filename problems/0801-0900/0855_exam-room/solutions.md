# Solutions — Exam Room

## Max-Heap of Gap Segments with Lazy Deletion

Wherever two students sit with free space between them, the next-best seat
hides in that gap: the midpoint, at half the gap's distance from its
neighbors. The edges hold the two other candidates — seat `0` at a distance
of the first occupied seat, seat `n - 1` at a distance of `n - 1` minus the
last. The `ExamRoom` class models every candidate uniformly as a **segment
`(l, r)`** spanning adjacent occupied seats `l` and `r`, with sentinels `-1`
and `n` closing the edges, stored only when at least one free seat lies
strictly between.

The best segment — maximum distance, lowest seat number on ties — is served
by a max-heap keyed `(-distance, seat)`. Sitting at `s` splits the winning
segment into `(l, s)` and `(s, r)`; a `leave(p)` deletes the two segments
touching `p` and registers their union `(prev, next)`, restoring exactly the
gap structure of the remaining occupancy (an empty room keeps no segments —
the next student takes seat `0` outright).

Because segments are destroyed wholesale, heap entries go stale. The class
keeps a **live-segment set**: a popped entry whose pair is absent from the
set is garbage and skipped. This is safe because a segment's candidate seat
and distance are pure functions of `(l, r)` — an older entry for a
since-recreated pair describes the very same candidate. Occupancy itself
lives in a sorted list, giving `leave` its neighbors by binary search.

Both the Python and Java canonical solutions implement exactly this
structure. With at most `10⁴` calls, each doing a bounded amount of heap,
set, and sorted-list work (live segments never exceed the number of occupied
seats plus one), the workload stays far inside the limits even at
`n = 10⁹` — no structure depends on `n`'s magnitude.

**Complexity:** `O(log k)` heap operations per call amortized under lazy
deletion, plus `O(m)` sorted-list insertion (`m` = occupied seats);
`O(k)` space for `k` seated students.
