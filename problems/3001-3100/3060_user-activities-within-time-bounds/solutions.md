# Solutions — User Activities within Time Bounds

## Self-join same-type sessions, keep users with a pair inside twelve hours

Every qualifying user shows up as a pair, so the query lets `Sessions`
meet itself: aliases `a` and `b` join on `user_id` and `session_type`,
and `a.session_id <> b.session_id` bars a session from pairing with
itself. Ordering the join with `b.session_start >= a.session_start`
gives each unordered pair one canonical orientation, and under that
orientation the gap is precisely the idle time separating the two
sessions: `b.session_start - a.session_end` — negative when the later
session starts before the earlier one ends, i.e. they overlap. Twelve
hours is the stated maximum, so the test keeps pairs whose later
session starts no later than `datetime(a.session_end, '+12 hours')`.
SQLite renders that shifted bound back into the same ISO-8601 shape the
column stores, so an ordinary string comparison decides it, and a pair
sitting exactly on the bound survives. `DISTINCT` collapses a user's
possibly many close pairs into one row, and `ORDER BY a.user_id ASC`
dresses the output in the demanded order.

Ordering the pairs also carries the correctness argument on its own: if
some pair `(a, c)` fits, then `a` paired with whichever same-type
session starts immediately after `a` fits too, because that immediate
successor starts no later than `c` does. Scanning start-ordered pairs
therefore finds every qualifying user — no window functions or lead/lag
machinery needed.

The self-join materializes every same-user same-type pair, quadratic in
a table of n sessions; beyond the result rows only constant working
memory is kept.

**Complexity:** `O(n^2)` time, `O(n)` space.
