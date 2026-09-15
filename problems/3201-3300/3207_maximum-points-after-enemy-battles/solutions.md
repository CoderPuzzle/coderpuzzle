# Solutions — Maximum Points After Enemy Battles

Points come only from spending energy on unmarked enemies, and marking is
the only way to refill energy. The exchange rate between the two operations
is set entirely by whichever enemy stays unmarked forever, because every
marked enemy's energy simply joins the pool that gets spent in fixed lots.

## Smallest-enemy battery

Per the hints, keep the smallest enemy `m` unmarked as the battery: it is
the cheapest point source, and giving up the smallest value maximizes both
the dividend (all other energies get added) and minimizes the divisor. If
`currentEnergy < m`, not even the first point can be earned — marking
requires a point already, so no refill can ever start and the answer is 0.
Otherwise one point arrives immediately by farming `m` once; from then on,
whenever the energy dips below `m`, mark any remaining enemy to top it up.
Since energy only ever accumulates in amounts of exactly marked enemies'
values and every lot of `m` converts to a point as soon as it forms, all
other enemies are eventually consumed and the total equals
`(currentEnergy + sum(enemyEnergies) - m) / m` (integer division) — no
simulation needed.

The bound justifies the 64-bit return: with lengths up to `10⁵` and values
up to `10⁹`, the answer is at most `10⁹ + 10⁵·10⁹ ≈ 10¹⁴ < 2⁴⁷`, so typed
languages accumulate in 64-bit integers while JavaScript's Number stays
exact below `2⁵³`.

**Complexity:** `O(n)` time, `O(1)` space.
