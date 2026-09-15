# Solutions — Maximum Energy Boost From Two Drinks

Drinking the same beverage hour after hour is always legal, so the only
real decision is when a switch is worth sacrificing an hour for. The whole
timeline collapses into two running numbers: the best total achievable so
far if the latest drunk hour ended on A, and the same if it ended on B.

## Two-state dynamic programming

Let `dpA[i]` be the maximum total energy over hours `0..i` whose hour `i`
drink is A, and define `dpB[i]` symmetrically, with bases
`dpA[0] = energyDrinkA[0]` and `dpB[0] = energyDrinkB[0]`. Staying on the
same drink simply extends the previous hour's plan. Switching cannot chain
directly — drinking B at hour `i-1` forbids A at hour `i`, since the
cleanse hour must sit between them — so the best plan that drinks A at
hour `i` either drank A at hour `i-1` or drank B at hour `i-2` and idled
through hour `i-1`. That gives the pair of recurrences
`dpA[i] = max(dpA[i-1], dpB[i-2]) + energyDrinkA[i]` and
`dpB[i] = max(dpB[i-1], dpA[i-2]) + energyDrinkB[i]`, and the answer is
the larger of the two final values.

Each recurrence reads only the current pair and the one-hour-older pair,
so four rolling variables suffice instead of full arrays: seed the pair at
hour 1 by drinking one drink twice, keep the previous pair alongside, and
shift both forward each hour. Totals climb to `n × max = 10⁵ × 10⁵ = 10¹⁰`,
past the 32-bit range, so typed languages accumulate in 64-bit integers;
JavaScript's Number stays exact because `10¹⁰ < 2⁵³`.

**Complexity:** `O(n)` time, `O(1)` space.
