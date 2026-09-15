# Solutions — Minimum Relative Loss After Buying Chocolates

Sort the prices once, then answer every query with prefix sums plus one
binary search over how the purchase splits around `k`.

## Split at k and binary-search the crossover

Reduce each chocolate to what it adds to Bob's relative loss `b - a`: one
priced at or below `k` contributes exactly its price (Bob pays everything),
while one above `k` contributes `k - (p - k) = 2k - p` (Bob pays `k`, Alice
covers the rest). Sorting the prices separates those two regimes: the left
part (prices <= k) has contributions growing with price, the right part
(prices > k) has them shrinking with price, so whatever `m` dictates, an
optimal purchase always takes some cheapest prefix of the left part
together with some most-expensive suffix of the right part — enumerating
the split point `j` covers every optimum.

The enumeration collapses to a binary search. Moving from `j` picks on the
left to `j + 1` adds `prices[j]` to Bob's share and drops the worst
remaining right-side chocolate, changing the total by
`prices[j] + prices[n-m+j] - 2k`; both prices only grow as `j` rises, so
that marginal change never decreases along the sweep. The optimal `j` is
therefore the first position where the swap stops paying off (`>= 0`),
found by plain binary search inside the feasible range
`[max(0, m-(n-c)), min(m, c)]`, where `c` is the count of prices `<= k`;
prefix sums then evaluate the chosen split in constant time. Sums reach
`10⁵ · 10⁹ = 10¹⁴` and `2k·m = 2·10¹⁴`, so every accumulator must be
64-bit; JavaScript numbers stay exact because both bounds sit far below
`2⁵³`.

**Complexity:** `O(n log n + q log n)` time, `O(n)` space.
