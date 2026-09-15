# Solutions — Sum of Floored Pairs

## Frequency prefix sums over multiples

The identity that unlocks the problem is that `floor(x / y)` equals the number of positive multiples of `y` not exceeding `x` — count `y`, `2y`, `3y`, ... up to `x`. Summing over all ordered pairs `(x, y)` and swapping the order of summation gives: for each value `y` present, and each multiple `m·y`, add the number of elements `x` with `x >= m·y`, all weighted by how many copies of `y` the array holds.

That count of "elements at least `m·y`" is a prefix-sum lookup. The code builds a frequency array over the value range, its running prefix `prefix[v] = #elements <= v`, and then for every `y` with a nonzero frequency iterates `m = y, 2y, ...` up to the maximum value, accumulating `prefix[max_val] - prefix[m - 1]` (elements with value at least `m`). Each `y`'s accumulated total is multiplied by its frequency and folded into the answer modulo `10^9 + 7`.

The double loop looks quadratic but is the harmonic sum `M/1 + M/2 + ...` over the values present (with `M = max(nums)`), which grows like `M log M` — comfortably fast for values up to 100,000. Skipping absent values prunes further, and the ordered-pair semantics (including `i = j`) fall out of summing over every present divisor-value independently.

**Complexity:** `O(M log M)` time, `O(M)` space.
