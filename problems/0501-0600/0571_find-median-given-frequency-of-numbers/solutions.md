# Solutions — Find Median Given Frequency of Numbers

## Running counts, no expansion

The decompressed list is each `num` repeated `frequency` times in `num`
order, and a median is purely positional — two ranks in that order — so
the list never has to be built. `SUM(frequency) OVER (ORDER BY num)`
names each row's running count, the number of decompressed values at or
below its `num`, and `SUM(frequency) OVER ()` names the total `N`. The
two middle ranks collapse into one integer-division pair: the lower
middle is rank `(N+1)/2` and the upper is rank `(N+2)/2`, and when `N`
is odd both divisions land on the same middle rank, so the same `num`
fills both slots and the average is that `num` itself. The `num`
occupying rank `k` is the smallest `num` whose running count reaches
`k` — its predecessor's count is still below `k` — which one
aggregation pass picks twice:
`MIN(CASE WHEN upto >= k THEN num END)`.

The final expression mirrors the definition: sum the two picked nums,
divide by `2.0` — SQLite's integer `(0 + 1) / 2` truncates to `0` —
and `ROUND(x, 1)` reports one decimal, a real value on the wire with
ties going away from zero. Because nothing expands, the cost tracks
the table, not the data it encodes: a single row with frequency
`1000000000` answers as fast as frequency `1`. The direct alternative
does materialize the list — a recursive `tally(i)` CTE bounded by
`SELECT MAX(frequency) FROM Numbers`, cross-joined against `Numbers`
under `i <= frequency`, then `ROW_NUMBER() OVER (ORDER BY num)` picks
the same two ranks `(n+1)/2` and `(n+2)/2` — and pays `O(F)` rows for
it, where `F` is the decompressed total.

One pass computes the two window sums over the `N` rows of `Numbers`
— the `ORDER BY num` behind the running sum sorts at `O(N log N)` —
and the aggregation over those rows emits a single value.

**Complexity:** `O(N log N)` time, `O(N)` space.
