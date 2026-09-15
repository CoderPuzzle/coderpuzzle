# Solutions — Subarray Sums Divisible by K

A subarray's sum is a difference of two prefix sums, and a difference is
divisible by `k` exactly when both prefixes leave the same remainder — so
counting divisible windows is really counting pairs of equal remainders,
and a plain census of remainders settles each element in constant time.

## Prefix remainders in a count array

Sweep `nums` once carrying `prefix`, the sum of everything already
visited, reduced to its remainder `r` in `0..k-1`. A window ending at the
current position has a sum divisible by `k` exactly when it begins just
after an earlier position whose prefix leaves the same remainder `r`, so
what this step contributes is however many such earlier prefixes exist.
The array `remainders` holds exactly that census, seeded with
`remainders[0] = 1` for the empty prefix so windows starting at index 0
count like any other; after the lookup the sweep records the current `r`,
guaranteeing a position only ever pairs with strictly earlier ones.

Because the values may be negative, `prefix` dips below zero and the
normalized remainder must be recovered as `((prefix % k) + k) % k` — a
raw truncated remainder would land in a negative bucket and quietly pair
the wrong prefixes. On `nums = [4,5,0,-2,-3,1]` with `k = 5` the prefix
sums are 4, 9, 9, 7, 4, 5 with remainders 4, 4, 4, 2, 4, 0: the four
prefixes worth 4 pair among themselves for six windows, and the final
remainder 0 closes the whole array against the empty prefix, seven in
all. The `k` buckets price the census at `O(1)` per step, and the largest
possible answer, `n(n+1)/2 = 450015000` at `n = 3 * 10⁴`, sits well
inside 32 bits.

**Complexity:** `O(n + k)` time, `O(k)` space.
