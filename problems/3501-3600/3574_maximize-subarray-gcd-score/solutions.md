# Solutions — Maximize Subarray GCD Score

## Window enumeration over 2-adic tiers and odd parts

Doubling an element multiplies it by 2, which raises its power-of-two
exponent (its 2-adic "tier") by exactly one and leaves its odd part
untouched. So for any fixed window the GCD decomposes without simulating
the operations: it is `2^M * g`, where `g` is the GCD of the elements'
odd parts — a quantity no doubling can change — and `M` is the best
achievable minimum tier. Because each element may be doubled at most
once, every element ends on its own tier or one above it, so the window
minimum can climb by at most one: `M = m + 1` exactly when the budget `k`
covers every element sitting on the minimum tier `m` (they all need their
single doubling), and `M = m` otherwise — pushing further would require
promoting those same elements twice.

Fixing the left end and sweeping the right end makes every piece
incremental: the odd-part GCD folds in one `gcd` per step, a 32-slot
array tracks how many window elements sit on each tier, and the `M` test
is one comparison against the minimum-tier count. A safe upper bound
prunes each left end early: every later window has length at most `n - l`,
an odd-part GCD no larger, and a minimum tier at most `m + 1`, and
`2^(m+1) * g <= 2 * min(window) <= 2 * 10^9`, so once
`(n - l) * 2^(m+1) * g` cannot beat the best score the sweep stops. The
maximum score is at most `n * 2 * max(nums) <= 3 * 10^12`, which needs —
and fits comfortably in — 64-bit integers; note that a doubled element
itself can reach `2 * 10^9`, just past 32 bits, which is why the odd
parts (never the doubled values) are the ones kept in 32-bit variables.

**Complexity:** `O(n² log V)` time (`n²` window extensions, one `gcd`
each), `O(n)` space for the odd-part and tier arrays.
