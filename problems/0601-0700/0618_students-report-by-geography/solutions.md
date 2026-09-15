# Solutions — Students Report By Geography

## Number each continent, then pivot by row number

The report's rows are positions, not students: the `i`-th output row
holds the `i`-th name of each continent in that continent's own
alphabetical order. `ROW_NUMBER() OVER (PARTITION BY continent ORDER BY
name)` computes exactly those positions — the window sorts each
continent's names alphabetically and numbers them from 1, so in the
example America's Jack and Jane land at 1 and 2 while Asia's Xi and
Europe's Pascal both land at 1. Equal names take neighboring positions
in arbitrary order, which cannot disturb the output: the values at those
positions are equal, so whichever duplicate stands where, a continent's
`i`-th slot reads the same name.

The pivot then collects everything that shares a row number. GROUP BY rn
puts one name from each continent in every group, and
`MAX(CASE WHEN continent = 'America' THEN name END)` — spelled three
times, once per continent — lifts that continent's name into its output
column: inside a group the CASE is non-NULL for exactly one continent
and NULL for the rest, and MAX ignores NULLs, returning the one real
name — or NULL when a continent contributes no row to the group at all,
which is how Asia and Europe read NULL on the report's tail rows. The
America guarantee — at least as many students as Asia or Europe — means
America's column never runs dry and the groups run exactly 1 through
America's count, so the report carries one row per American student. No
ORDER BY is needed on the way out: the statement accepts any row order,
and the judge compares rows as an unordered multiset.

The window pass sorts each continent's names once, and the group-by pass
reads the numbered rows a second time; only the numbered intermediate is
materialized. With `n` rows in `Student` the sort dominates.

**Complexity:** `O(n log n)` time, `O(n)` space.
