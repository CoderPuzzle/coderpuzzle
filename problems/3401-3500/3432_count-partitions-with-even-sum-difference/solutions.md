# Solutions — Count Partitions with Even Sum Difference

A partition at index `i` compares the sum of `nums[0..i]` against the sum of
`nums[i+1..n-1]`. Writing both in terms of the whole array's total turns the
question into pure parity arithmetic, and `n` is at most `100` with values at
most `100`, so every sum fits comfortably in 32-bit integers.

## The difference's parity never depends on the split

The left sum plus the right sum is always the total, so
`left - right = total - 2 * right`. Twice any integer is even, which means
`left - right` has exactly the parity of `total` — no matter where the split
falls. The `n - 1` partitions therefore live or die together: if the total is
even, every difference is even and the answer is `n - 1`; if the total is
odd, no difference can be even and the answer is `0`. Example 1 totals to
`36` (even) and indeed all `4` partitions count; `[1, 2, 2]` totals to `5`
(odd) and none does.

One pass adds up the array, then a single parity test returns `n - 1` or `0`.
No per-partition loop is left, prefix sums are unnecessary, and the whole
computation is a sum plus one conditional.

**Complexity:** `O(n)` time, `O(1)` space.
