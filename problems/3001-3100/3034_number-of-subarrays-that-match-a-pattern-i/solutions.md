# Solutions — Number of Subarrays That Match a Pattern I

## Sign array, window by window

Boil every adjacent pair down to its relation: `1` when the values rise,
`-1` when they fall, `0` when they repeat. A size-`m + 1` subarray matches
exactly when its `m` relations spell out the pattern, so counting matching
subarrays becomes counting positions where `pattern` occurs inside this
shorter sign array.

Building the `n - 1` signs takes one pass over `nums`. Each of the
`n - m` candidate windows is then compared against `pattern` element by
element; a single mismatching relation rejects the window and the scan
slides one position to the right. With `n <= 100` this direct comparison
sits far inside the limits — the linear-time pattern matching that would
matter at larger scales is deliberately out of scope for this version.

![On nums = [1,4,4,1,3,5,5,3] the sign array is [1,0,-1,1,1,0,-1]; the pattern [1,0,-1] window matches only at offsets 0 and 4, the subarrays [1,4,4,1] and [3,5,5,3], so the count is 2.](figures/solution-sign-array-windows.svg)

**Complexity:** `O(n * m)` time, `O(n)` space.
