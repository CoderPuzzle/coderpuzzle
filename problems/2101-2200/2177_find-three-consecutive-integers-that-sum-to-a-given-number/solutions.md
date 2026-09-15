# Solutions — Find Three Consecutive Integers That Sum to a Given Number

## Solve for the middle directly

Write the triple as `x-1, x, x+1`: their sum is exactly `3x`, so `num` is
expressible if and only if it is divisible by 3. When it is, the middle
element is `num / 3` and the answer follows immediately; when it is not,
no amount of searching helps because no integer middle exists.

**Complexity:** `O(1)` time, `O(1)` space.
