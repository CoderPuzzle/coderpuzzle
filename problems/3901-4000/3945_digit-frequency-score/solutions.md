# Solutions — Digit Frequency Score

## Digit sum

The term `d * freq(d)` is exactly the total contribution of every occurrence
of digit `d`. Summing that over all distinct digits is therefore the sum of
all decimal digits of `n`.

Extract each digit by repeated division and accumulate it.

**Complexity:** `O(log n)` time, `O(1)` space.
