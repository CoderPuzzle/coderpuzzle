# Solutions — Election Results

## Split every ballot, aggregate the shares, keep the top tier

One person's single vote may be spread across several candidates, so a
row can never be counted as a whole vote: the unit of accounting is the
voter, not the row. Grouping `Votes` by `voter` and taking
`1.0 / COUNT(candidate)` builds exactly that — each voter's non-null rows
per their ballot size, so a two-candidate voter contributes 0.5 to each
line and an abstainer's null-only ticket divides nothing into any
candidate. `COUNT(candidate)`, not `COUNT(*)`, is what keeps abstention
rows out of the denominator; a voter who never voted gets no share at
all.

Those per-voter shares are joined back onto the non-null rows by voter,
and `GROUP BY candidate` with `SUM(share)` adds up, for each candidate,
every fraction of every ballot that named them — Charles' three-way split
lands 1/3 on Ryan, Christine, and Kathy alike, while Anthony's whole vote
lands 1.0 on Ryan alone. Floating-point sums of thirds are honest but not
bit-exact, so the aggregate is rounded (`ROUND(SUM(share), 9)`) before
comparison; candidates whose totals agree arithmetically then compare
equal regardless of summation order, while genuinely different totals sit
far outside that grain. The winners are everyone tied with
`(SELECT MAX(votes) FROM totals)` — filtering rather than ranking-and-
keeping-one means a two-way tie naturally outputs both names. The final
`ORDER BY candidate` puts those rows in the required ascending order.

Each of the two groupings passes over the `V` rows of `Votes` once
(hash- or sort-built groups over the shares join), and the surviving
groups are scanned once more for the max.

**Complexity:** `O(V log V)` time, `O(V)` space.
