# Solutions — Number of Ways to Build House of Cards

## DP over rows shrinking upward

A row holding `k` triangles consumes `3k - 1` cards, and the placement
rules force every row above to hold strictly fewer triangles than the
row below (each upper triangle needs a horizontal card beneath it). So
a house is exactly a strictly decreasing sequence of triangle counts
whose card costs sum to `n`. Count such sequences with a memo keyed on
`(cards remaining, row bound above)`: choose the next row size `k`
within the bound and recurse on what is left; hitting zero cards marks
one complete house.

**Complexity:** `O(n^2 * sqrt(n))` time in the worst case but far less
in practice (the inner loop stops once `3k - 1` exceeds the remainder),
`O(n^2)` space.
