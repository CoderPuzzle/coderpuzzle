# Solutions — Sequential Digits

## Sliding windows over "123456789"

A sequential number is nothing but a contiguous slice of the digit string
`"123456789"` — its starting digit and length fully determine it. So
enumerate every window: nine lengths, and for each length `9 - length +
1` starting positions, at most 36 candidates total. Each cut parses to a
number; keep those inside `[low, high]`. Enumerating lengths ascending
and starts left to right emits candidates in numerically ascending order,
so no sort is needed — and once a window's value exceeds `high`, every
later window of that length (and all longer ones) does too, ending the
scan early.

**Complexity:** `O(1)` time — at most 36 fixed-size candidate numbers are
built regardless of the range; `O(1)` space beyond the output.
