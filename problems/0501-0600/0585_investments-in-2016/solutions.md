# Solutions — Investments in 2016

## Grouped keys as filters, then one sum

The two qualifying conditions are properties of the whole table, not of
any one row, so the query builds each as a grouped set first.
`GROUP BY tiv_2015` with `HAVING COUNT(*) > 1` collects the 2015 values
that two or more policyholders share; `GROUP BY lat, lon` with
`HAVING COUNT(*) = 1` collects the location pairs that belong to exactly
one policyholder. The location must group as a pair: two policyholders at
the same latitude but different longitudes are in different cities, so
grouping on `lat` alone would wrongly read their cities as shared.

The joins are the filter. `Insurance i JOIN shared_2015 s ON
i.tiv_2015 = s.tiv_2015` drops every policyholder whose 2015 value nobody
else holds, and `JOIN unique_city u ON i.lat = u.lat AND i.lon = u.lon`
drops every one whose location pair somebody else also holds — inner
joins, because a row failing either test should vanish rather than
survive null-padded the way an outer join would keep it. Each CTE carries
one row per value or pair, so every policyholder matches at most once on
each side and the surviving rows are never duplicated into the sum. What
is left is `ROUND(SUM(i.tiv_2016), 2)`: the sum runs over the REAL
column, and `ROUND` takes it to two decimals with ties going away from
zero on the stored binary value — exactly `45.125` rounds up to `45.13`,
while a decimal `2.675` is stored a hair below the half and stays `2.67`.
When nothing qualifies the aggregate still emits its one row: the sum of
no rows is null.

Two aggregation passes over the `N` policyholders materialize the two key
sets. SQLite typically raises an automatic index over each materialized
CTE, resolving every row's two probes in constant time; with no index at
all the engine could nested-loop the join at `O(N^2)` comparisons.

**Complexity:** `O(N)` time, `O(N)` space.
