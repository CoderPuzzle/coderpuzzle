# Solutions — Seat Reservation Manager

## Next-Seat Counter plus Min-Heap of Returns

`reserve` always answers the smallest free seat. A min-heap holding every free
seat models that directly, but it spends `O(n)` memory and setup on seats that
may never be touched. The `SeatManager` class observes instead that seats are
handed out in increasing order as long as nothing is given back: a counter
`next_seat` remembers the largest seat number ever reserved, so a `reserve`
with no outstanding returns is just `next_seat++`.

Only `unreserve` disrupts that monotone march, and it disrupts it by exactly
one seat — so that is all the heap needs to hold. Returns go into a min-heap
`returned`; `reserve` checks whether the pile is non-empty (its top is always
a seat below `next_seat`) and takes the smallest return, otherwise it draws a
fresh seat from the counter. The check `returned[0] < next_seat` documents the
invariant that the two sources never overlap.

Both the Python and Java canonical solutions implement exactly this scheme.
Every operation is one heap push/pop or one counter bump, so `10⁵` mixed calls
stay far inside the limits while the structure only ever stores the currently
returned seats — the follow-up's request.

**Complexity:** `O(log n)` time per `reserve`/`unreserve` (amortized `O(1)`
counter path), `O(r)` space where `r` is the number of currently unreserved,
previously used seats.
