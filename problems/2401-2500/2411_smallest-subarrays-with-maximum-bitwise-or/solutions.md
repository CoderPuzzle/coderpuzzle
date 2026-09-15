# Solutions — Smallest Subarrays With Maximum Bitwise OR

## Backward scan of each bit's nearest set position

Fix a start index `i`. Because OR only ever gains bits as a subarray grows,
the maximum OR reachable from `i` is the OR of the entire suffix
`nums[i..n-1]`, and the shortest subarray attaining it ends at the first
`j` where `nums[i..j]` already carries every bit that suffix offers. A
subarray is still missing a bit exactly when it stops before the nearest
position at or after `i` that has that bit set — so per bit `b`, the
distance the answer must cover is `nearest_b(i) - i + 1`, and
`answer[i]` is the maximum of those distances over the bits of the suffix
OR. Bits of `nums[i]` itself sit at distance 1, which is why the answer is
never shorter than 1.

Those nearest positions fall out of one right-to-left sweep per bit:
walking `i` from `n-1` down to 0 with a single `last` variable (the most
recent index carrying the bit) keeps `nearest_b` current without any
per-`i` recompute. The implementation is bit-major — thirty sweeps, each
maxing its gap into `answer[i]` — which is the same `O(30·n)` work as the
index-major form but touches one bit of state at a time. `nums[i] <= 10⁹ <
2³⁰` bounds the sweeps at thirty, satisfying hint 4's linear-in-`n` goal
up to that constant.

Values fit comfortably in 32-bit integers (no sums or products appear,
only ORs), and the only storage beyond the output is `O(1)` per sweep.

**Complexity:** `O(30·n)` time, `O(n)` space.
