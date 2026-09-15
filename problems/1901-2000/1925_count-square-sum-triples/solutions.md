# Solutions — Count Square Sum Triples

## Pair enumeration with a perfect-square check

A triple `(a, b, c)` is fully determined once `a` and `b` are chosen: `c` must
be the positive square root of `a² + b²`, and it counts only when that root is
an integer within `[1, n]`. So the answer is exactly the number of ordered
pairs `(a, b)` whose squared sum is a perfect square not exceeding `n²`.
Enumerating all pairs is `O(n²)`, and each pair needs one square-root test.

The test avoids floating-point pitfalls by rounding: compute
`r = round(sqrt(s))`, then verify `r * r == s` on the integer side. For the
largest input, `n = 250`, every sum stays at or below `250² = 62500`, so 32-bit
integers are exact throughout and JS `Number` arithmetic is exact far below its
`2⁵³` limit.

**Complexity:** `O(n²)` time, `O(1)` space.
