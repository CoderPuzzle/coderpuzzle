# Solutions — Number of Single Divisor Triplet

## Count value frequencies, then enumerate value multisets

`nums[i]` never exceeds 100 while the array can hold 10⁵ entries, so
collapse the array into a frequency table and reason over value multisets
instead of index triplets. For each non-decreasing value triple `(a, b, c)`
compute whether `a + b + c` is divisible by exactly one of its members —
divisibility is per index, so a repeated value contributes one hit per
copy. When it qualifies, translate to ordered index triplet counts from
the bins: three distinct values give `fa·fb·fc·6`; two equal give
`f(f-1)/2 · f_once · 6`; all three equal give the falling factorial
`f(f-1)(f-2)`. At most ~171k triples — effectively free regardless of
array length.

**Complexity:** `O(n + V³)` time with `V ≤ 100` distinct values, `O(V)`
space.
