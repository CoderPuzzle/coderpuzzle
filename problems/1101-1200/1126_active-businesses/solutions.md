# Solutions — Active Businesses

## Compare each row to its event's average, then count per business

The query has three stages, each a simple aggregate. First, a window
average `AVG(occurrences) OVER (PARTITION BY event_type)` decorates every
row with the mean of its own event type — no separate averages table to
join, the mean rides along in the same scan.

Second, the `WHERE` clause keeps only the rows strictly above that average.
The comparison is strict, so a business sitting exactly on the mean (or
below it) contributes nothing — this is where the "strictly greater" wording
lives.

Third, the survivors group by `business_id` and pass through `HAVING COUNT
(*) > 1`: distinct event types above average is what "more than one
event_type" means, and because `(business_id, event_type)` is the primary
key a business can contribute at most one row per event type, so counting
rows equals counting event types.

**Complexity:** `O(N log N)` time for the grouped window aggregation over
`N` Events rows, `O(N)` space for the decorated intermediate.
