# Solutions — Total Score of Dungeon Runs

A point is earned by every pair "start at room `a`, stand in room `b`" for
which the health remaining after room `b` still clears `requirement[b]`.
Summing scores over all starts is exactly summing those pairs, so the whole
problem reduces to one dominance count over the prefix sums of `damage`.

## Total subarrays minus failing pairs

Let `pref[i]` be the total damage of rooms `1..i` (so `pref[0] = 0`). Starting
at room `a + 1`, the health left in room `b` is `hp - (pref[b] - pref[a])`,
so room `b` pays a point precisely when
`pref[a] >= requirement[b] - hp + pref[b]`. Every `1 <= a <= b <= n` start/room
pair is one subarray, and the sum of scores equals the number of such pairs
that clear the inequality. There are `n(n + 1) / 2` pairs in total.

The pairs that fail are counted per `b`: for each room `b`, walk over the
earlier prefix sums `pref[0..b-1]` and count those strictly below the
threshold `requirement[b] - hp + pref[b]`. A Fenwick tree over the compressed
prefix sums makes each count an `O(log n)` prefix query while the previous
prefix sums are inserted in order — insert `pref[0]`, then for each room count
the failures and insert `pref[b]`. Subtracting the accumulated failures from
the total gives the answer.

Prefix sums stay under `10⁹` and the answer is at most `n(n + 1) / 2 ≈ 5 · 10⁹`
for `n = 10⁵`, so the count is kept in 64-bit integers in every language
(JavaScript/TypeScript stay exact because every value is far below `2⁵³`).

**Complexity:** `O(n log n)` time, `O(n)` space.
