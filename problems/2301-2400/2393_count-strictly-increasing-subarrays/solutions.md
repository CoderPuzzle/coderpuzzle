# Solutions — Count Strictly Increasing Subarrays

## Count subarrays ending at each index

The strictly increasing subarrays that end at index `i` are exactly the
suffixes of the maximal increasing run through `i`. If `run[i]` is the
length of the longest strictly increasing run ending at `i`, then
`run[i] = run[i-1] + 1` when `nums[i-1] < nums[i]`, and `1` otherwise — a
one-pass recurrence. Each such subarray is counted once by its right
endpoint, so summing `run[i]` over all indices gives the total.

Counts reach roughly n(n+1)/2 ≈ 5×10⁹ at n = 10⁵, which overflows 32-bit
integers; use a 64-bit accumulator. (JavaScript numbers hold integers
exactly up to 2⁵³, far beyond this bound.)

**Complexity:** `O(n)` time, `O(1)` space.
