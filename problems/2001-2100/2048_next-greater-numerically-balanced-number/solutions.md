# Solutions — Next Greater Numerically Balanced Number

## Scan candidates and count digits

Start at `n + 1` and test consecutive integers until one is numerically balanced. For each candidate, count its decimal digits; reject it immediately if it contains zero, then require every other digit that appears to occur exactly as many times as its value.

The first candidate that passes is the smallest valid integer strictly greater than `n` by construction. Under the given `10⁶` bound, the next balanced number is close enough for this direct scan, and the fixed ten-entry count array does not grow with the input.

**Complexity:** `O((answer - n) * digits)` time and `O(1)` space.
