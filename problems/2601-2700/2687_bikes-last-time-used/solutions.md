# Solutions — Bikes Last Time Used

## Group per bike, take the maximum, sort most recent first

The answer is one row per bike number holding that bike's greatest
`end_time`, emitted with the most recently used bike on top. Grouping does
the first job directly: `GROUP BY bike_number` collapses each bike's rides
into a single output row, and `MAX(end_time)` selects the latest of them —
the "last time used". A bike with only one ride still forms its own group,
so its lone `end_time` passes through the maximum unchanged, exactly as the
example requires for `W00300`.

The sort is expressed on the output column: `MAX(end_time)` is aliased back
to `end_time`, and `ORDER BY end_time DESC` refers to that alias, ranking
bikes by their selected most-recent time, descending. Datetimes are
fixed-width `YYYY-MM-DD HH:MM:SS` text, so the engine's comparison order
matches chronological order — no casting is needed anywhere in the query.
An empty table leaves no groups to form, so the query correctly returns
zero rows rather than a `null` placeholder.

The aggregation reads every ride once (`n` rows scanned, one running maximum
kept per bike), and the engine then sorts the `b` grouped rows by their
selected times.

**Complexity:** `O(n + b log b)` time, `O(b)` space.
