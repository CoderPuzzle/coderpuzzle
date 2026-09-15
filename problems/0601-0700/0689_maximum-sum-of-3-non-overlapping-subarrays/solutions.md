# Solutions — Maximum Sum of 3 Non-Overlapping Subarrays

## Best flanks from both ends, swept over the middle

Every candidate window has the same fixed length `k`, so the search has no
lengths to choose — only starts. Write `window[s]` for the sum of
`nums[s..s+k)`; a valid answer is a triple of starts `(i, j, l)` with
`i + k <= j` and `j + k <= l` maximizing `window[i] + window[j] + window[l]`,
and the many equal-value plateaus the bounds allow make the lexicographic tie
rule load-bearing, not decorative.

One forward pass and one backward pass precompute the flanks. `left[s]` is
the index of the largest window sum over starts `[0..s]`, kept at the
smallest index on ties by replacing only on a strict improvement;
`right[s]` is the same over `[s..m-1]`, built right to left so that a tie
takes the newer, smaller index. Sweeping the middle start `j` upward and
combining it with `left[j-k]` and `right[j+k]`, again updating only when the
total strictly improves, leaves the first middle achieving the maximum. That
first-wins sweep is exactly the lexicographic rule: for a fixed `j` the two
flanks are independent, so the smallest-index argmax on each side is already
the lexicographically best pairing, and if two optimal triples ever disagreed
on the middle, mixing the smaller left flank into the smaller middle would
yield an optimal triple that is lexicographically smaller still — so the
global minimum always sits at the minimal middle, which the sweep keeps.

All sums stay exact in 32-bit arithmetic in the fixed-width ports: a window
holds at most `6666 * 65535 < 2³¹` and the winning triple at most about
`1.31 * 10⁹ < 2³¹ - 1`; the JavaScript ports hold every value exactly as a
double far below `2⁵³`.

**Complexity:** `O(n)` time, `O(n)` space.
