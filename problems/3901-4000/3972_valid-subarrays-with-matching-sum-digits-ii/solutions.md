# Solutions — Valid Subarrays With Matching Sum Digits II

The approach below uses strictly increasing prefix sums and slides one window
per leading-digit decade, counting residues mod 10 as it goes.

## Prefix sums with per-decade sliding windows

Take prefix sums `P[0..n]` with `P[0] = 0`; every subarray sum is a difference
`P[j] - P[l]`. Because all elements are positive, the prefixes are strictly
increasing, so for a fixed first-digit window `[x·10ᵖ, (x+1)·10ᵖ − 1]` the left
endpoints keeping `P[j] - P[l]` inside it form one contiguous index range whose
two bounds never move backward as `j` advances. Sweep `j` once per decade,
advancing those pointers and maintaining ten counters, one per prefix residue
mod 10.

A valid difference must additionally end in digit `x`, i.e.
`P[l] ≡ P[j] - x (mod 10)`, so the counter indexed by `P[j] - x` is exactly the
number of qualifying left endpoints for this `j` and decade. At most sixteen
decades exist below the maximum possible sum of about `10¹⁴`, so the sweep runs
in `O(n)` amortized work per decade. Answers are bounded by `n(n+1)/2 < 5.1e9`
and prefix sums by `10^14`, both far below `2^53`, which the JS solutions rely
on; the statically typed versions use 64-bit integers throughout.

**Complexity:** `O(n log(maxSum))` time, `O(n)` space.
