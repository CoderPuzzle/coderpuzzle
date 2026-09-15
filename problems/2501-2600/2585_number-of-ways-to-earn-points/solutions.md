# Solutions — Number of Ways to Earn Points

## Bounded Knapsack Dynamic Programming

This is a bounded knapsack: score plays the capacity role, each question
type is one item group worth `marksi` points per unit with at most
`counti` copies available, and the answer is the number of ways to fill
the capacity exactly. Because questions of a type are indistinguishable,
a type contributes only through its take-count — `q` questions of it,
`0 <= q <= counti`, landing `q * marksi` points.

A single rolling row carries the state. Processing types one at a time,
each fresh row resets to zero and fills `nxt[p]` by summing
`dp[p - q * marksi]` over every legal `q`, then reducing modulo
`10⁹ + 7`. The separateness of `nxt` is what forbids taking more copies
of the current type than allowed — reads come strictly from earlier
types' row. After all `n` rows, `dp[target]` is the answer, and an
unreachable target simply stays at `0`.

Precision stays tame under the modulus: every entry kept in `dp` is a
reduced residue below `10⁹ + 7`, so any inner sum adds at most
`counti + 1 <= 51` such residues — under `5.5 * 10¹⁰`, which fits a
64-bit accumulator (and sits far below JS Number's exactness bound of
`2⁵³`) before its single reduction. Time is `O(n * target * min_count)`,
bounded by about `50 * 1000 * 50` elementary additions in the worst
case.

**Complexity:** `O(n · target · count)` time (≈ 2.5·10⁶ additions worst
case), `O(target)` space for the two rolling rows.
