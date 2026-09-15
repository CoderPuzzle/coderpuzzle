# Reverse Subarray To Maximize Array Value

## Approach: Score-difference analysis over reversal endpoints

Reversing `[L, R]` changes only the two boundary links of the subarray:
the interior `|a[i] - a[i+1]|` terms are permutation-invariant under
reversal. So the gain is
`|a[R] - a[L-1]| + |a[L] - a[R+1]| - |a[L] - a[L-1]| - |a[R] - a[R+1]|`,
with the usual missing-neighbor conventions at the array ends, and the
answer is the base value plus the best gain (0 included — no reversal).

Two families cover all candidates in one pass. When the subarray touches an
array end, one boundary link disappears and the gain reduces to a single
`|a[0] - a[R+1]| - |a[R] - a[R+1]|`-style term, checked for every cut.
For interior reversals, writing each `|x - y|` as `max(x, y) * 2 - (x + y)`
shows the gain is bounded by `2 * (max of the pairwise minima - min of the
pairwise maxima)`, attained by choosing the two boundary pairs from the
adjacent pairs that achieve those extremes — a single scan tracks both.

**Complexity:** O(n) time, O(1) extra space.
