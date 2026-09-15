# Solutions — Count the Number of Incremovable Subarrays I

A subarray is incremovable exactly when what is left after removing it is
strictly increasing, so the count can be taken directly from the
definition.

## Check every removal directly

Enumerate every subarray by its start i and end j and inspect the
surviving elements: the prefix nums[:i] followed by the suffix
nums[j + 1:] must rise strictly from left to right. A single pass over
those elements decides each candidate, restarting the comparison from a
sentinel 0 (every value is positive) at the seam where prefix hands over
to suffix — the two ends of the removed range are the only place the
remaining sequence could break. With n ≤ 50 there are at most 1275
subarrays and each check touches at most 50 elements, so the triple
enumeration is trivially inside the limits; the answer never exceeds
n(n + 1)/2 = 1275 and fits a plain 32-bit integer.

**Complexity:** `O(n³)` time, `O(1)` space.
