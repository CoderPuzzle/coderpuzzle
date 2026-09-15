# Solutions — Countries You Can Safely Invest In

## Double every call into its two countries, then compare group averages to the whole

Every call is placed "in" up to two countries at once — the caller's and
the callee's — so the natural unit of the aggregation isn't a `Calls` row
but a (country, duration) pair, one per side of the call. The CTE
`country_calls` builds exactly that: it joins `Calls` to `Person` on
`caller_id` and resolves each caller's country by matching the first
three characters of their phone number against `Country.country_code`,
then repeats the same join on `callee_id`, and `UNION ALL` concatenates
the two halves without deduplicating — a call between two people of the
same country legitimately contributes that country's duration twice,
matching the explanation's `102 + 102` for Peru.

With `country_calls` holding one row per (country, duration) pair, the
per-country average is a single grouped aggregate, `GROUP BY country`
with `AVG(duration)`, and the global average is the same aggregate with
no grouping at all, `(SELECT AVG(duration) FROM country_calls)` —
critically over the same doubled table, not the raw `Calls` rows, so a
call between two countries counts once toward each side's average and
twice toward the global one, matching the LeetCode explanation's `2 * (...)
/ 20`. The `HAVING` clause keeps only the countries whose group average is
strictly greater than that scalar, which SQLite evaluates once per query
since the subquery has no correlation to the outer `GROUP BY`.

The CTE materializes `2C` rows for `C` calls (each call doubled), the
grouped pass and the global-average subquery each scan it once, and the
`HAVING` filter emits at most one row per distinct country.

**Complexity:** `O(C)` time, `O(C)` space.
