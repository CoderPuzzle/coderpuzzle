# Solutions — Maximum Product of Two Digits

## Track the Two Largest Digits

Every digit of `n` is non-negative, so among all pairs of digits the largest
product is always the one formed by the two largest digits: swapping either
member of the top pair for a smaller digit can only shrink the product. The
note about reusing a digit is honored automatically by working on the
multiset of digits — two occurrences of the same digit are two separate
elements, so `22` yields `2 · 2 = 4` and a lone `2` never pairs with itself.

The method collects the at most ten digits of `n`, sorts them, and returns
the product of the top two. Sorting ten elements is constant work, so the
whole computation is dominated by scanning the decimal representation. A
zero digit only matters when it lands in the top two — `n ≥ 10` guarantees
at least two digits, so the product is always well defined (`10` correctly
yields `1 · 0 = 0`).

**Complexity:** `O(d)` time for `d = ⌊log₁₀ n⌋ + 1 ≤ 10` digits, `O(1)` space.
