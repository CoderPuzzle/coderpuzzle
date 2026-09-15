# Solutions — My Calendar I

## Sorted Bookings with Binary-Searched Insertion

Double-booking is a pairwise property, but checking a new event against every
accepted booking is `O(n)` per call. The `MyCalendar` class exploits ordering
instead: it keeps the accepted events as two parallel arrays — starts sorted
ascending, ends aligned with them — so a new event `[start, end)` can only
intersect the **last booking that starts at or before `start`** and the
**first booking that starts after it**. Any earlier booking ends no later than
its successor's start, and any later one starts no sooner than its
predecessor's end, so the two neighbors already rule them out.

`book` binary-searches the starts (`bisect_right` in Python, an explicit
halving loop in Java) to find that neighbor position. Half-open intervals make
the conflict tests exact: the previous booking overlaps when its end is
strictly greater than the new start, and the next booking overlaps when its
start is strictly less than the new end — touching endpoints do not conflict,
which is why `[10, 20)` and `[20, 30)` can coexist. If both tests pass the
event is inserted exactly at the position the search identified, keeping the
arrays sorted without a re-sort; a rejected event mutates nothing.

Both the Python and Java canonical solutions implement exactly this structure.
With at most `1000` calls, each costing a logarithmic search plus a linear
shift of the parallel arrays, the workload is trivial.

**Complexity:** `O(log n)` search plus `O(n)` insertion per `book`, `O(n)`
space for `n` accepted bookings.
