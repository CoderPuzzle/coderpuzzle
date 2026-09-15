# Solutions — The Number of Ways to Make the Sum

## Enumerate the Scarce Coin Count

Only the value-4 coin is scarce; every other denomination is unlimited,
and the statement caps it at two indistinguishable copies. Splitting any
target by how many six-coins it uses collapses the unbounded part of the
knapsack into pure arithmetic: after setting aside `b` coins of value 6,
the leftover amount must be covered by ones and twos alone, and a
remaining sum `r` has exactly `r / 2 + 1` such covers (`twos = 0 .. r/2`,
the rest all ones). Summing that expression over every feasible number of
sixes therefore counts all combinations made with the unlimited coins, in
one short descending loop.

The rare coin then contributes by case: casting zero, one, or both copies
of value 4 leaves targets `n`, `n - 4`, and `n - 8` respectively for the
unbounded count, and each skipped case is simply dropped when its target
goes negative. Because multiset order does not matter, these three cases
never overlap or double-count — the two physical 4-coins are counted as
an unordered pair, not as two distinguishable choices.

At `n = 10⁵` the raw totals reach well past a billion before any modulus
is applied, so the accumulation runs in a wide integer type (Java `long`,
C++ `long long`, Go `int64`, Rust `i64`; Python integers are unbounded),
with the fold `mod 10⁹ + 7` performed once at the end. JavaScript and
TypeScript stay exact as `number` too, since the true count never comes
near 2⁵³.

**Complexity:** `O(n)` time, `O(1)` space.
