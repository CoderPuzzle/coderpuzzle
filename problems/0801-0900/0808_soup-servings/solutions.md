# Solutions — Soup Servings

## Bottom-up probability DP

Everything is measured in servings of 25 mL, so `n` mL becomes `m = ceil(n / 25)` servings and each operation removes `(4, 0)`, `(3, 1)`, `(2, 2)`, or `(1, 3)` servings from `(A, B)`. On average the operations drain A faster than B, so as `m` grows the probability that A empties first converges to 1; the code exploits this by returning `1.0` outright once `m >= 179`, where the true answer is already within the accepted `1e-5` tolerance. This cutoff caps the table at `178 x 178` cells no matter how large `n` is, which is what makes the `10^9` constraint harmless.

The recurrence says the probability from state `(a, b)` is one quarter of the sum over the four operations applied to that state. Base cases live in the `value` helper: both soups gone in the same turn counts half (the problem adds `0.5` for ties), A gone alone counts `1`, and B gone alone counts `0`. Any argument that drops to zero or below on a pour is clamped by these base cases, matching the rule that an over-pour empties the soup completely.

The table is filled bottom-up in increasing order of both coordinates, so `table[a][b]` is always computed before it is read, and the `value` indirection routes out-of-range lookups to the base cases instead of indexing the array. The answer is `value(m, m)`, the probability of A emptying before B (plus half the tie probability) starting from full bowls.

**Complexity:** `O(m^2)` time, `O(m^2)` space, where `m = ceil(n / 25) <= 178`.
