# Solutions — Find Longest Calls

## Rank calls inside their type with a window function

Each call type contributes its own top three, which is a per-partition
ranking: `ROW_NUMBER() OVER (PARTITION BY type ORDER BY duration DESC,
first_name DESC)` numbers every call within its side by exactly the
tie-broken order the output demands — longest first, equal lengths settled
by first name in descending order. Joining `Calls` to `Contacts` on
`contact_id` attaches the owner's name needed both as a select column and
as that tiebreaker. The outer query keeps rows numbered 1–3 per partition
and orders the survivors by `type DESC, duration DESC, first_name DESC`;
with `'outgoing' > 'incoming'` lexicographically this reproduces the
example's outgoing-block-then-incoming-block layout.

The `HH:MM:SS` formatting is pure integer arithmetic on the duration:
hours are `duration / 3600`, minutes come from the remainder divided by 60,
seconds from the final remainder, and `PRINTF('%02d:%02d:%02d', ...)`
zero-pads each part to two digits so two-minute and seven-minute calls
render as `00:02:00` and `00:07:00`.

**Complexity:** `O(C log C)` time, `O(C)` space — `C` calls sorted inside
their partitions once; an equivalent formulation filters via a correlated
count of strictly longer same-type calls.
