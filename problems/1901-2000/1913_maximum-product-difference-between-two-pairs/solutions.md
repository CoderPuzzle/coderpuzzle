# Solutions — Maximum Product Difference Between Two Pairs

## Single pass over four extremes

Because every value is at least 1, both factors of the positive pair should be
as large as possible and both factors of the negative pair as small as
possible: the maximum difference is always the product of the two largest
values minus the product of the two smallest. No pairing of mixed magnitudes
can do better, since replacing any factor by a more extreme value in the same
direction only widens the difference.

The code therefore streams through `nums` once while maintaining the two
largest values seen (`m1 >= m2`, seeded with 0) and the two smallest
(`s1 <= s2`, seeded above the value range). Each element either promotes into
one of the four slots or is discarded, and the answer is
`m1 * m2 - s1 * s2`.

The largest possible product is `10⁴ · 10⁴ = 10⁸`, well inside 32-bit range,
so plain `int` arithmetic is exact in every language, and the same bound keeps
JS `Number` exact far below `2⁵³`.

**Complexity:** `O(n)` time, `O(1)` space.
