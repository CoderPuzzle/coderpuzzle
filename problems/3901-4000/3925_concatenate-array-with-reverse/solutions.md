# Solutions — Concatenate Array With Reverse

## Reverse copy

Allocate the result with length `2 * n`. Copy `nums` into the first half,
then write the input from right to left into the second half. This directly
matches the formal definition and keeps the original array unchanged.

The reverse pass is independent of the values, so only the positions matter.
No extra transformations are needed.

**Complexity:** `O(n)` time, `O(n)` space.
