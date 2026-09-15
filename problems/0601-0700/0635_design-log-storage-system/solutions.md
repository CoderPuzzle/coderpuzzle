# Solutions — Design Log Storage System

## Fixed-Width Prefix Truncation

The store is just the arrival sequence: one list of `(id, timestamp)` pairs in
the order `put` delivered them. `retrieve` maps the granularity to a prefix
length — `Year` keeps `"2017"` (4 characters) and each finer field appends a
`":XX"`, so `Month` 7, `Day` 10, `Hour` 13, `Minute` 16, `Second` 19 — then
truncates every string to that width: each log's timestamp and both bounds.
Because every domain is a zero-padded decimal of fixed width, the truncated
strings all line up field-for-field, and a plain lexicographic comparison
between the truncated bounds is exactly the field-by-field comparison the
granularity asks for; slicing into integers or splitting on `:` is never
needed.

Truncating the bounds themselves is what widens the range to whole units: an
`end` of `2017:01:02:23:59:59` at `Day` granularity becomes `2017:01:02`, so
the day's own hour, minute, and second are discarded and both edge days are
covered inclusively — the example's `Hour` query keeps both 2017 logs while
excluding log 3, whose truncated `2016:01:01:00` falls one hour below the
truncated start `2016:01:01:01`. The promised output order costs nothing
extra: the scan simply walks the pairs oldest-first, so the surviving ids come
back in the order their logs were stored, duplicates included.

Nothing here needs an index. With at most 500 total calls, `put` is an
append and every `retrieve` is one linear pass whose per-log work is a couple
of fixed-width slices and comparisons.

**Complexity:** `O(1)` per `put`; `O(L)` per `retrieve` over the `L` stored
logs; `O(L)` space.
