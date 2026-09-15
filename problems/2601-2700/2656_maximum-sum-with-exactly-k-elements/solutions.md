# Solutions — Maximum Sum With Exactly K Elements

## Greedy Arithmetic Progression

Greedy first principles: on every operation the score gains exactly the
value taken, so taking a larger element now is never worse — it scores
more immediately and returns `m + 1` to the array, dominating any smaller
pick's future. Therefore every optimal plan takes the maximum of the
current array each round, and with the chosen maximum m re-entering one
larger, the taken sequence is forced: m, m + 1, ..., m + k - 1.

The code reads m = max(nums) once and closes the arithmetic series in
constant time as `k * m + k * (k - 1) / 2` — k copies of the base
maximum plus the sum 0 + 1 + ... + (k - 1). The array contents beyond m
never matter, so no simulation or bookkeeping over mutated arrays is
needed.

Widening: the largest possible answer is 100 · 100 + 100 · 99 / 2 =
14950, and no intermediate exceeds it, far inside 32-bit range in all
seven languages; JavaScript doubles stay exact trivially under its 2⁵³
limit.

**Complexity:** `O(n)` time for the single max scan, `O(1)` extra space.
