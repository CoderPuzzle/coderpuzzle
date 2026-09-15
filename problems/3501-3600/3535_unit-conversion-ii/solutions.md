# Solutions — Unit Conversion II

## Tree Propagation of Conversion Rates

The conversion edges form a tree rooted at unit 0, because the statement
guarantees every unit is uniquely reachable from unit 0 through forward or
backward conversions. For each unit `u` define `fromRoot[u]` as the number
of units of type `u` equivalent to one unit of type `0`: walking down the
tree multiplies one factor per edge, so one traversal from the root fills
the whole array with the residues of those path products modulo `10⁹ + 7`.
Everything is kept modular from the start — the raw path products reach
`(10⁹)^10⁵`, far beyond any fixed-width integer, while residues fit a
64-bit lane (in JavaScript, whose safe-integer range is 2⁵³, each multiply
folds through `BigInt` before reducing).

A query asks for `fromRoot[b] / fromRoot[a]`: one unit of type `a` is
`1/fromRoot[a]` units of the root and each root unit is `fromRoot[b]` units
of type `b`. The answer is therefore `fromRoot[b] · fromRoot[a]⁻¹` computed
in the field modulo `10⁹ + 7`. No residue can be zero — every factor is at
most `10⁹ < 10⁹ + 7`, so a path product is never divisible by the prime
modulus — which makes the modular inverse well defined; Fermat's little
theorem gives it as a single `O(log MOD)` exponentiation per query. Each
query is then answered in constant time, and units with `a == b` fall out
naturally as 1.

**Complexity:** `O(n + q log MOD)` time, `O(n)` space.
