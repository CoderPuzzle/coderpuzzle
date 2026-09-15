# Solutions — Maximum Value of an Ordered Triplet II

## Prefix and suffix maxima

The value (nums[i] - nums[j]) * nums[k] factors cleanly once the middle index
j is fixed: the first factor only involves indices left of j and the second
factor only involves indices right of j. Since `nums` values are positive, the
best i < j is simply the largest value before j and the best k > j is the
largest value after j, so preprocessing `prefix_max` (running maximum from the
left) and `suffix_max` (running maximum from the right) reduces every middle
index to one formula: (prefix_max[j - 1] - nums[j]) * suffix_max[j + 1]. The
answer is the maximum of that expression over all valid j, clamped at 0 so a
triplet set that is negative everywhere reports 0.

Both maxima arrays are built in a single linear sweep each, and the final
scan is linear too, so n up to 10⁵ stays well inside the limits. The product
peaks at (10⁶ - 1) * 10⁶ = 999999000000, which overflows signed 32-bit
arithmetic, so the running answer and both maxima arrays are kept in 64-bit
integers throughout (in JavaScript and TypeScript the same bound stays below
2⁵³, so plain `number` arithmetic is exact).

**Complexity:** `O(n)` time, `O(n)` space.
