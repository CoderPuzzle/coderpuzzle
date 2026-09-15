# Solutions — Find the Substring With Maximum Cost

## Kadane's Algorithm with Character Costs

Every character's value can be resolved before the scan: untouched letters
keep their alphabet position (1 for `a` through 26 for `z`), while entries of
`chars` override with their `vals[i]`. After that mapping the task collapses
to classic maximum-subarray sum — with one twist — so a lookup table of 26
entries turns the problem into a linear Kadane pass.

The twist is the empty substring: its cost of 0 must always be available.
Kadane's running sum is therefore clamped at zero (`run = max(run + value,
0)`), which simultaneously means "restart here" and "drop everything so far";
the answer is the largest value the clamp-aware accumulator ever reaches. With
`|s| ≤ 10⁵` and weights within ±1000, no prefix sum leaves the ±10⁸ range, so
32-bit integers are safe in every language.

**Complexity:** `O(|s| + |chars|)` time, `O(1)` extra space.
