# Solutions — Valid Elements in an Array

## Prefix and suffix maxima

Precompute the maximum value from the start through every index and the
maximum value from every index through the end. For an interior position
`i`, `nums[i]` is strictly greater than every value to its left exactly when
it exceeds the prefix maximum at `i - 1`; the symmetric test uses the suffix
maximum at `i + 1`.

Scan `nums` in its original order and append an element when either strict
comparison succeeds. Append the first and last elements unconditionally, as
required; the same rule naturally returns the single element when `n = 1`.

**Complexity:** `O(n)` time, `O(n)` space.
