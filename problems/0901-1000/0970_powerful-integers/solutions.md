# Solutions — Powerful Integers

A powerful integer is the sum of one entry from each of two geometric
ladders, `1, x, x², …` and `1, y, y², …`, capped by `bound`. The ladders are
tiny everywhere in the constraints: a base of `2` against `bound = 10⁶` holds
only the twenty powers `2⁰` through `2¹⁹`, every larger base holds fewer, and
a base of `1` holds exactly one. So the pair space never exceeds `20 × 20 = 400`
sums — enumerating all of them directly is already the whole job.

## Walk both ladders into a set

Nest two walks. The outer one climbs the x-ladder while `x^i <= bound`; the
inner one, for each such `x^i`, climbs the y-ladder while the running sum
`x^i + y^j` stays within `bound`, depositing every legal sum into a hash set.
The stops are exactly the completeness argument: a y-power is at least `1`, so
once `x^i` alone passes `bound` no sum it heads can qualify — likewise for the
inner walk — and every pair the definition admits is visited before either
walk halts.

The one trap is a base of `1`: multiplying by `1` never advances, so an
unguarded ladder walk would spin forever. But the ladder of base `1` is the
single value `1 = 1⁰`, so the exponent is capped at `0` — take that one entry
and break. The set is what keeps the answer honest under overlap: when
`x = y`, or when the ladders coincide on a value (`2² = 4¹` makes
`2² + 4⁰` and `2⁰ + 4¹` both equal `5`), the pair walk produces the same sum
twice and the set absorbs it, so each value occurs at most once.

A final sort over the set states the pinned ascending order in code. With `P`
the number of pairs the two walks visit (`P <= 400` under the constraints, one
single-entry ladder when a base is `1`) and `R` the number of distinct
results, the set pass costs `O(P)` and the sort `O(R log R)`.

**Complexity:** `O(log_x B · log_y B + R log R)` time, `O(R)` space.
