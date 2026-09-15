# Solutions — Maximum Split of Positive Even Integers

## Greedily take the smallest evens, then fold in the leftover

An odd total can never be a sum of even numbers. For an even total,
maximizing the part count means growing the sum as slowly as possible:
take `2, 4, 6, ...` in order while what remains still allows a strictly
larger final part (`remaining - take > take`). Whatever is left at that
point gets merged into one last value bigger than every taken part, so
uniqueness survives and the sum is exact.

The count this produces is optimal: it equals the largest `k` with
`2 + 4 + ... + 2k = k(k+1) <= finalSum`, and no split can use more parts
since `k` distinct positive evens already sum to at least `k(k+1)`.

**Complexity:** `O(sqrt(finalSum))` time for the taken parts,
`O(sqrt(finalSum))` space.
