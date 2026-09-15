# Solutions

Any approach produces the same prefix totals; they differ only in whether
the accumulation re-reads the input or carries a running total forward.
Carrying the total is the single pass presented below; re-summing each
prefix from scratch would be quadratic for no benefit.

## Carry the Accumulator

Walk the array once keeping the sum of everything seen so far. Element
`i` adds `nums[i]` to the accumulator, and that accumulator is exactly
`runningSum[i]`, so it can be written in place (or into a fresh result).
Each index is touched once with one addition.

**Complexity:** `O(n)` time, `O(1)` extra space beyond the output.
