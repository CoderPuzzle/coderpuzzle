# Solutions — Find Zombie Sessions

## One Group per Session, Judged in HAVING

Every zombie rule is a property of a session's event set, so the query
is a single grouped pass: group `app_events` by `session_id` and
`user_id` and judge all four criteria inside each group. The event-type
counts are `SUM(event_type = 'scroll')` and friends, since SQLite scores
each row's type test as 1 or 0. The duration never needs date arithmetic
beyond a subtraction: `strftime('%s', ...)` converts a timestamp to its
Unix-epoch seconds, so last-minus-first over `MIN`/`MAX` is a plain
integer gap, and the statement's guarantee that every timestamp sits on
a minute boundary makes dividing that gap by 60 an exact whole-minute
duration.

All four admission rules are per-group facts, so they live in `HAVING`:
the epoch gap strictly greater than 1800 seconds, at least five scrolls,
and the ratio test written without division — `clicks / scrolls < 1/5`
cross-multiplies to `5 * clicks < scrolls`, which stays in integers and
never divides by zero, because any group still in play already holds at
least five scrolls. A purchase anywhere in the group zeroes the last
test. Sessions that miss any rule simply lose their whole group, which
is what an empty result looks like here, with no outer joins or extra
branches. `ORDER BY scroll_count DESC, session_id ASC` emits the
mandated row order; equal scroll counts fall back to ascending session
ids.

Each event row is read once and feeds a constant number of aggregate
terms, so with hash grouping the query runs in one linear sweep over the
table (sort-based plans add a log factor); working storage holds one
accumulator set per distinct session.

**Complexity:** `O(E)` time and `O(S)` space for `E` events and `S`
sessions.
