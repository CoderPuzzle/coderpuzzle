# Solutions — Partition Array for Maximum XOR and AND

Only B has a nonlinear (AND) contribution, so the enumeration runs over
the choice of B; the A/C split of everything else is handled in closed
form by a linear basis.

## Subset enumeration with masked linear basis

Two subset tables — AND(B), seeded with the all-ones identity and read
as 0 for the empty subset per the statement, and XOR(B) — are filled in
one `2^n` pass. Fixing B leaves a pool of `n - |B|` indices with
`s = XOR(pool)`; choosing A amounts to choosing a subset-XOR `x` of the
pool (C gets the complement), and `x + (s ^ x) = s + 2 * (x & ~s)` —
the bits s already owns are worthless, and the rest doubles. Masking
every pool value with `~s` and building a linear XOR basis turns
"maximize `x & ~s`" into the standard greedy: scan the basis from the
top bit down, taking a vector whenever it raises `x`. Each candidate B
is first checked against the bound `and(B) + s + 2 * (~s & MASK)` — the
largest value the split could possibly add — which retires most subsets
before any basis work once a good incumbent is found.

Values below 2³⁰ keep every XOR, AND, and basis vector inside 30 bits,
while the total reaches `3 × (10⁹ − 1) ≈ 3×10⁹` (take `nums = [10⁹, 10⁹,
10⁹]`), past the 32-bit range but far below 2⁵³, so 64-bit integers
carry every sum.

**Complexity:** `O(2ⁿ · n · β)` time (`β ≈ 30` basis levels, usually far
less after pruning), `O(2ⁿ)` space.
