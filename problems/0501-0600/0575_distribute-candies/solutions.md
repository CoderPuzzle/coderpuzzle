# Solutions — Distribute Candies

## Hash set of types against the allowance

Two caps compete for the answer. Alice eats at most `n / 2` candies, so she
can taste at most `n / 2` types; and she cannot taste more types than exist,
so the number of distinct values in `candyType` is the second cap. A type
needs only one candy to be tasted, so each eaten candy can be a new type
until the types or the allowance runs out — the maximum is
`min(distinct, n / 2)`.

The code builds the distinct count with a single pass into a hash set, which
collapses duplicate types for free, and returns the smaller of the set's
size and half the array's length. All-distinct input leaves the allowance
binding; a uniform input leaves the type count binding at 1; the two caps
meet exactly when at most half the candies are distinct values.

**Complexity:** `O(n)` time, `O(n)` space.
