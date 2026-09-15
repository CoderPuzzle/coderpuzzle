# Solutions — Maximum Total Subarray Value I

## Whole-array spread times k

No subarray can outperform the full array. A subarray only sees a subset
of the elements, so its maximum never exceeds the global maximum and its
minimum never drops below the global minimum; every subarray's value —
maximum minus minimum — is therefore bounded by the array-wide spread
`max(nums) - min(nums)`, and no way of distributing `k` picks over the
array can push any single pick past that spread.

The bound is attainable, which is what makes the problem small: picks may
repeat, so choosing the entire array as each of the `k` subarrays scores
exactly `k * (max(nums) - min(nums))`. Where the extremes sit and how the
values between them behave is irrelevant — only the two extreme values
matter. One pass tracking the running maximum and minimum settles both,
and their difference is multiplied by `k` at the end.

Width, not speed, is the trap here: the spread reaches `10⁹`, `k`
reaches `10⁵`, so the product reaches `10¹⁴` and overflows 32-bit
integers even though every element fits — fixed-width languages must
accumulate in 64-bit and return a 64-bit value. (JavaScript numbers hold
`10¹⁴` exactly, staying below `2⁵³`.)

**Complexity:** `O(n)` time, `O(1)` space.
