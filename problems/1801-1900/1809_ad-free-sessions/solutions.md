# Solutions — Ad-Free Sessions

A session counts as ad-free only when no ad row matches it on both the
customer and the clock: an ad belongs to a session exactly when its
`customer_id` equals the session's and its `timestamp` falls inside the
inclusive `[start_time, end_time]` window.

## Anti-join on customer and window

The query is an anti-join: keep each `Playback` row for which the
correlated `NOT EXISTS` probe finds no `Ads` row with the same
`customer_id` and a `timestamp BETWEEN start_time AND end_time`. Both
matching conditions are load-bearing — the example's session `5` survives
because customer `2`'s ads land at `17` and `20`, outside its `2`-`8`
window, and an ad shown to a _different_ customer during your session
never counts against it (session `1` of a hypothetical cross-customer ad
would stay ad-free). `BETWEEN` makes both window ends inclusive, which
the example itself exercises: the ad at time `5` covers session `1`
exactly at its `end_time`.

With no index on `customer_id` in the pinned schema, the probe is a scan
per session — `O(S·A)` integer comparisons in the worst case, which is
still ~32 million cheap comparisons at the corpus ceilings (4000
sessions x 8000 ads), far inside the time limit. Empty inputs fall out
naturally: no sessions means no rows, and sessions with an empty `Ads`
table are all ad-free. Rows compare as a multiset, so no `ORDER BY` is
needed.

**Complexity:** `O(S·A)` time, `O(1)` extra space.
