# Solutions — Check if The Number is Fascinating

We can validate the concatenated decimal digits directly.

## Track each digit once

Build the decimal string formed by `n`, `2 * n`, and `3 * n`. A fascinating
number must produce exactly nine digits, so any other length can be rejected
immediately.

Scan those digits with a ten-element boolean table. Reject a zero or a digit
whose entry is already set; if all nine characters pass, they are nine
distinct digits drawn from 1 through 9, so every required digit appears
exactly once.

**Complexity:** `O(log n)` time, `O(log n)` space.
