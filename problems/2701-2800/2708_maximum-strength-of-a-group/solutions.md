# Solutions — Maximum Strength of a Group

The group is an arbitrary non-empty subset, so the whole task is deciding
which elements a maximal product keeps. With values confined to `-9` through
`9` and at most `13` of them, that decision is pure sign bookkeeping.

## Sort, then pair the signs

Sort the array, which gathers the negatives at the front. A zero in the
group forces the product to zero, and any product of kept nonzeros has
magnitude at least 1, so zeros never help. Negatives pay off only in even
counts — a pair of them multiplies to a positive — so keep every positive
and let the negatives pair up from the most-negative end; when the count of
negatives is odd, drop the negative closest to zero, the one that sacrifices
the least magnitude. Multiply what survives.

When nothing survives, the array is all zeros or its only nonzero element
is the lone negative just dropped, and the best group is the largest single
element: zero beats any negative product there. Otherwise the kept product
is achievable and dominates every alternative — each positive factor is at
least 1, so the product of the positives already bounds any single element,
and every negative pair contributes a factor of at least 1 — while the
exchange argument shows discarding any other nonzero element only shrinks
the magnitude.

The strongest possible answer is `9^13 ≈ 2.5 × 10^12`, past 32-bit range,
so fixed-width languages accumulate in 64 bits. JavaScript's doubles hold
every integer up to `2^53 ≈ 9.0 × 10^15` exactly — far above this bound —
so plain number arithmetic stays exact through every intermediate product.

**Complexity:** `O(n log n)` time, `O(1)` extra space.
