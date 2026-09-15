# Solutions — Smallest Index With Digit Sum Equal to Index

## Direct Digit-Sum Scan

The condition is checked per position independently — the digit sum of
`nums[i]` against the constant `i` — and the statement asks for the
smallest qualifying index, so a single left-to-right scan that returns on
the first hit is exactly the whole problem; if the scan finishes, no
index qualifies and the answer is `-1`.

The digit sum of each value is extracted arithmetically, peeling one
decimal digit per step with `% 10` and `/ 10`. With `nums[i] <= 1000`
there are at most four digits and the sum is at most `27`, so every
comparison is tiny fixed work; the overall cost is one pass over the
array with an early exit at the first match.

**Complexity:** `O(n)` time, `O(1)` space.
