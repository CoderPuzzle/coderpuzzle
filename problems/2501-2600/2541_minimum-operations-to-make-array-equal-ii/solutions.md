# Solutions — Minimum Operations to Make Array Equal II

## Divisibility scan with paired-mass counting

Every operation hands exactly one index an extra `k` and takes exactly one
index's `k` away, so think in units of `k`: index `i` whose entries differ
by `diff_i` needs precisely `|diff_i| / k` unit-steps, half of them pushing
it up-market and half down, no matter how cleverly the pairings are
arranged. That immediately yields the impossibility conditions the first
hint points at: some difference not divisible by `k` can never be closed,
and if the ups do not cancel the downs (`diff_0 + … + diff_{n-1} != 0`)
the array can never balance either. The second hint's greedy observation
is really this accounting in disguise — pushing an already-large index
further up only adds steps that later have to be walked back.

Given those facts, the minimum follows in one linear scan: accumulate the
signed total `net` and the absolute movement `mass` over all indices, fail
on the first indivisible gap or on `net != 0`, and otherwise answer
`mass / (2 * k)` because every single operation carries `2k` units of the
total. The corner `k = 0` deserves its own branch: an operation then moves
nothing at all, so equality is attainable exactly when the arrays already
match, costing zero operations.

Bounds make the arithmetic comfortable everywhere: `mass <= n · 10⁹ =
10¹⁴`, far inside signed 64-bit range, and the answer itself tops out
near `5 · 10¹³`, also below JavaScript's exact-Number limit `2⁵³`, so the
scalar-number languages need no big-integer machinery.

**Complexity:** `O(n)` time, `O(1)` extra space.
