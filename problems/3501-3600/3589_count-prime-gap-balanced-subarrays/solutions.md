# Solutions — Count Prime-Gap Balanced Subarrays

## Sliding window over prime positions with monotonic deques

Non-prime elements are invisible to the condition — they only space out the
primes — so a sieve marks primality and the algorithm works purely with
prime positions. For a fixed right end `i`, the subarrays `nums[j..i]` that
contain at least two primes are exactly those with `j <= prev2`, the
second-to-last prime position at or before `i` (the last two primes
`prev2`, `prev1` then sit inside), and because widening leftward only adds
primes, the starts whose prime spread stays within `k` form a suffix. So
`lo`, the minimal start whose window's max prime minus min prime is `<= k`,
only moves forward, and the balanced subarrays ending at `i` number
`prev2 - lo + 1` whenever `lo <= prev2`.

Two monotonic deques of prime positions — values increasing, values
decreasing — expose the current window's min and max prime in constant
time; the shrink loop advances `lo`, dropping each deque's front when it
falls out, until the spread is `<= k`. Since `lo <= prev2` and the fronts
only collide with `lo` one prime at a time while a wider spread remains,
the loop is safe with a single prime in the window (spread 0 never
triggers it). A balanced subarray needs two primes, hence at least two
elements, so the count is bounded by `n(n - 1) / 2 = 1,249,975,000 <
2^31 - 1` and fits `i32`; the running sum still accrues in 64-bit width
before the final cast.

**Complexity:** `O(V + n)` time for sieve limit `V = max(nums)` — each
index enters and leaves each deque once — and `O(V + n)` space.
