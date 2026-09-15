# Solutions — Maximum Sum of Three Numbers Divisible by Three

A triplet's sum is divisible by 3 exactly when its remainders mod 3 sum to a
multiple of 3, so the value of a number beyond its remainder only matters
through its size.

## Remainder groups, top three each

Split the numbers into three groups by `x % 3`. The only remainder patterns
summing to 0 mod 3 are `0+0+0`, `1+1+1`, `2+2+2`, and `0+1+2`, and within a
pattern the sum is maximized by taking the largest values of each group — so
the three largest values per group are all the input that matters, at most
nine numbers. Sort each group descending, try the four patterns (skipping
those a group is too small to fill), and keep the best sum; when no pattern
is feasible the answer stays 0.

The answer is at most `3 · 10⁵`, so plain 32-bit arithmetic is safe
throughout. Sorting dominates at `O(n log n)` time (an `O(n)` pass with
fixed-size top-tracking does the same job), with `O(n)` space for the groups.

**Complexity:** `O(n log n)` time, `O(n)` space.
