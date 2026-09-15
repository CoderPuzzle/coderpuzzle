# Solutions — Count Days Spent Together

## Day-of-year intersection

Two stays overlap exactly when the later arrival still precedes (or equals)
the earlier departure, and every date string is just a month-and-day pair,
so the first move is to put every date on one common axis: the day of the
year. Summing the fixed month lengths `[31, 28, 31, 30, 31, 30, 31, 31, 30,
31, 30, 31]` into "days before month m" turns any `"MM-DD"` into a single
integer — parse the two pieces, add the month's offset — with no leap day
to worry about since the year is guaranteed common.

With Alice's stay `[a, b]` and Bob's stay `[c, d]` as inclusive day-of-year
intervals, the days spent together are the interval
`[max(a, c), min(b, d)]`, also inclusive: each person must be present, so
a day qualifies only if it is at or after both arrivals and at or before
both departures. When the two bounds cross — the later arrival falls after
the earlier departure — the interval is empty and the answer is clamped to
0 by the `max(0, ...)` guard; otherwise its length is
`min(b, d) - max(a, c) + 1`, the `+1` because both endpoints count as full
days.

Everything is a fixed amount of work: four small parses, a table of twelve
offsets, two `max`/`min` comparisons.

**Complexity:** `O(1)` time, `O(1)` space.
