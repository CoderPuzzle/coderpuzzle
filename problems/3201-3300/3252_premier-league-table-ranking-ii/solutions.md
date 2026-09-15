# Solutions — Premier League Table Ranking II

## Window rank plus integer-cut tiers

Each row already carries its finished season, so the points are a pure
per-row expression — `3 * wins + draws`, with losses worth nothing — and
no join or aggregation is needed to produce them. The position is
competition ranking over that expression: `RANK() OVER (ORDER BY 3 * wins

- draws DESC)`gives tied totals the same number and lets the next
distinct total skip past every tied team (1, 1, 3). The same pass also
needs the league size, and`COUNT(*) OVER ()` delivers it on every row,
  saving a separate scan.

The tiers are cuts on the position, not shares of the rows: Tier 1 ends
at position `⌈0.33 · N⌉` and Tier 2 at `⌈0.66 · N⌉`, computed exactly in
integers as `(33 * n + 99) / 100` and `(66 * n + 99) / 100` — sqlite
divides two integers by truncating, and adding 99 before dividing turns
that truncation into a ceiling without touching floats. Because the CASE
tests the shared position rather than a row number, ties straddling a cut
land wholly in the higher tier, exactly as the statement demands;
bucketing rows directly with `NTILE(3)` would instead split tied teams
across tiers whenever a tie group meets a boundary.

`DENSE_RANK()` is the classic near-miss for the position: it numbers
without gaps, so after two co-leaders the chaser gets 2 instead of 3 and
every later cut lands too early. The final `ORDER BY points DESC,
team_name` presents the required table; the judge compares rows as an
unordered multiset, so that ordering is presentation rather than
correctness, but it costs nothing beyond the sort the ranking already
performs.

**Complexity:** `O(N log N)` time, `O(N)` space.
