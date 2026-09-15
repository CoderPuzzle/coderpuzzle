# Solutions — My Calendar II

A booking may be refused only for one reason: some moment it covers is already
covered twice. So the calendar keeps exactly the information that question
needs — where the calendar is merely busy, and where it is busy twice — and
each `book` call answers it with two straight scans.

## Two Interval Lists

`singles` records every accepted event and `doubles` records every region
where two accepted events overlap. A candidate `[start, end)` is checked
against `doubles` first: half-open intervals `[a, b)` and `[c, d)` meet
exactly when `a < d and c < b`, so one comparison per region decides whether
the candidate would land on a moment already covered twice — a third event,
which is refused with nothing recorded. Surviving that check, the candidate
can no longer create a triple anywhere: every accepted event it meets is
single at the meeting, and each intersection `[max(start, s), min(end, e))`
joins `doubles` while the candidate itself joins `singles`.

The `doubles` regions stay pairwise disjoint, which is why a single overlap
test per region is sound. Two regions in `doubles` could only intersect at a
moment covered by three or four accepted events — but any event that would
have created the third coverage was refused before it could be recorded, so
such a moment never exists. The half-open bound does the rest of the work at
the edges: a candidate ending exactly where a double region starts, at time
`t`, covers no moment `>= t` and so slips past it untouched, which is why
booking `[9, 10)` next to a doubled `[10, 20)` succeeds.

Both lists grow by one entry per accepted booking and never shrink, so a
`book` call pays a linear scan of each and nothing else — no sorting, no
rebalancing, no per-time-point storage over a range that can span a billion
units. Rejected calls touch nothing and cost only the scan that refused them.

**Complexity:** `O(n)` time per booking, `O(n)` space.
