# Solutions — Type of Triangle

## Strict triangle inequality, then count equal pairs

A triple forms a triangle exactly when every pair of sides sums to strictly
more than the third: `a+b > c`, `a+c > b`, and `b+c > a`. The comparison
must be strict — when the two shorter sides merely equal the longest one,
as in `[1, 2, 3]`, the points lie flat and the answer is `"none"` rather
than any triangle type.

If the inequality holds, compare the three lengths directly: all equal is
`"equilateral"`, any single matching pair is `"isosceles"`, and all
distinct is `"scalene"`. With only three sides at most one pair can match
unless all three do, so these cases are exhaustive and nothing finer is
needed.

**Complexity:** `O(1)` time, `O(1)` space.
