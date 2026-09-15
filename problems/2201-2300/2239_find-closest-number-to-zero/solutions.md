# Solutions — Find Closest Number to Zero

## Scan with an absolute-value tiebreak

One pass keeps the best candidate so far: a value replaces it when its
absolute value is strictly smaller, or when the absolute values tie and
the value itself is larger, since of two numbers equally close to zero
(for example `-2` and `2`) the positive one must be returned.

**Complexity:** `O(n)` time, `O(1)` space.
