# Solutions — Monotonic Array

The definition offers two ways to succeed — monotone increasing or monotone
decreasing — so the cheapest proof keeps both hypotheses alive and lets the
array refute them. One left-to-right pass with two flags settles it: the
answer is whether at least one hypothesis survives every adjacent pair.

## Two Surviving Hypotheses

Carry `increasing` and `decreasing` flags, both starting `true`. Each
adjacent pair `nums[i - 1]`, `nums[i]` is evidence against at most one
hypothesis: a strict rise is compatible with increasing but kills
decreasing, a strict drop does the symmetric damage, and equal neighbours —
allowed by both definitions — leave everything standing. The array is
monotonic exactly when at least one flag is still `true` after the last
pair, which is why `[1,3,2]` fails (the rise refutes decreasing, the drop
refutes increasing) while a one-element array or a pair of equal values
never refutes anything and passes vacuously.

Equal adjacent values are where a strict one-direction scan goes wrong, and
the examples pin this down: `[1,2,2,3]` and `[6,5,4,4]` both answer `true`
because a plateau breaks neither hypothesis. Elements are only compared,
never combined, so the constraint's ±10⁵ extremes need no wider arithmetic,
and the pass allocates nothing beyond its two flags.

**Complexity:** `O(n)` time, `O(1)` space.
