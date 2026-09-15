# Solutions — Minimum Sum of Mountain Triplets II

A mountain is fully determined by its peak: for a fixed middle index `j`,
the cheapest valid triplet uses the smallest value anywhere to the left of
`j` and the smallest value anywhere to the right of `j`, because both
enter the sum and neither affects which indices are legal. So instead of
enumerating triplets, each index only needs those two precomputed
quantities.

## Prefix and suffix minima

One left-to-right pass fills `prefix_min`, where `prefix_min[i]` is the
smallest of `nums[0..i]`, and one right-to-left pass fills `suffix_min`,
where `suffix_min[i]` is the smallest of `nums[i..n-1]`. With those arrays
in hand, the candidates are exactly the interior indices: peak `j` is
usable when `prefix_min[j - 1] < nums[j]` and `suffix_min[j + 1] <
nums[j]`, and the best triplet through it sums those three values. The
strict inequalities are what reject equal shoulders — a plateau neighbor
is not smaller, so it cannot serve as a side.

The scan keeps the smallest qualifying sum, starting from `-1` so that an
array with no usable peak returns `-1` unchanged. Every value is at most
`10^8`, so any candidate sum is at most `3 * 10^8`, comfortably inside
32-bit range; the three passes each touch every element once.

**Complexity:** `O(n)` time, `O(n)` space.
