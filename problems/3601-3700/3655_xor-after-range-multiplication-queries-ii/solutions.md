# Solutions — XOR After Range Multiplication Queries II

## Stride-bucketed difference multipliers

Simulating every query literally costs the number of indices it visits,
which a query with stride 1 over the whole array drives to `n` per query —
`10^10` at the constraint maximum. Split the queries on the stride instead:
with `B = floor(sqrt(n))`, any query whose stride `k` exceeds `B` visits
fewer than `n / B + 1 <= sqrt(n) + 1` positions, so applying it exactly as
written stays within `q * sqrt(n)` element updates even if every query is
like that.

Small strides are where queries pile up, but they also share structure: a
query with stride `k` starting at `l` only ever touches indices congruent
to `c = l mod k`, i.e. coordinates of one fixed residue class. Bucket the
queries by `(k, c)` and turn each bucket's walks into multiplier events on
that class' coordinate axis — `v` at each query's first coordinate, and the
modular inverse of `v` just past its last coordinate (the modulus is prime
and `1 <= v < 10^9 + 7`, so the inverse always exists). A running product
swept along the sorted events is then the accumulated multiplier for each
stretch of coordinates in one pass; multiplying it into the array elements
applies every query of the bucket at once. Because an index belongs to
exactly one class per stride, all buckets of a single `k` together sweep
each array element once, so the small-stride half costs at most `B * n`
element updates overall regardless of how many queries share a bucket.

Multiplication modulo a prime commutes, so the order in which buckets and
direct queries land is irrelevant — each element simply collects the
product of all multipliers aimed at it, reduced every step to keep values
below `2^63` (in double-precision JavaScript, products of two residues are
kept exact by splitting one factor around `2^15`). The answer is the XOR of
the finished array.

**Complexity:** `O((n + q) sqrt(n))` time, `O(n + q)` space.
