# Solutions — Find the Minimum Possible Sum of a Beautiful Array

## Greedy prefix plus a wrapped tail

The cheapest beautiful array takes values greedily from 1 upward. The whole
prefix `1..k` with `k = min(n, target / 2)` is internally safe: any two of its
distinct members sum to at most `k + (k - 1) <= target - 1`. No member of that
prefix can ever be skipped for cause, because a pair summing to `target`
needs one value below `target / 2` and one above — replacing either element of
such a pair by the smallest unused value only lowers the total, so an optimal
solution always contains every value it can from the low end.

Each remaining slot must avoid every complement of the prefix: values in
`(k, target)` all clash with some taken number (`target - x` lands in
`[1, k]`), while values of exactly `target / 2` were already consumed when
`target` is even. The first safe candidate past the prefix is therefore
`target` itself — its complement `0` is not a positive integer — and the
consecutive values from there can never collide among themselves or with the
small side. So the tail is `target, target + 1, ..., target + m - 1` with
`m = n - k`, and the answer collapses to arithmetic-series sums:
`k * (k + 1) / 2 + m * target + m * (m - 1) / 2`, everything modulo
`10⁹ + 7`. No loop over `n` is needed at any point.

Widths stay bounded: the exact pre-modulo total peaks near `7.5 × 10¹⁷`, so
the fixed-width languages compute both series in signed 64-bit integers and
reduce once at the end; JavaScript/TypeScript cannot hold those products in a
Number's exact range (< `2⁵³`), so they halve each even triangular factor
first and multiply reduced factors through a 15-bit limb split, keeping every
intermediate below `2⁴⁶` — only residues travel on the wire in every
language.

**Complexity:** `O(1)` time, `O(1)` space — closed-form series with a single
final reduction, no iteration over `n` in any input regime.
