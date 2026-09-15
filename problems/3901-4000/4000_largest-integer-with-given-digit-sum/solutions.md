# Solutions — Largest Integer With Given Digit Sum

## Greedy digit fill

An integer with more digits is always larger, so use the full `n` digits
whenever possible. For each position from left to right, place the largest
digit that does not make the remaining sum impossible, which is at most `9`
and at most the remaining sum.

Handle `s == 0` separately by returning `0`, since a multi-digit number
cannot begin with zero. If `s > 9 * n`, no valid integer exists.

**Complexity:** `O(n)` time, `O(n)` space for the returned integer.
