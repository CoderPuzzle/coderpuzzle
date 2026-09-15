# Solutions — Number of Ways Where Square of Number Is Equal to Product of Two Numbers

## Frequency Map with Divisor Pairing

Checking every `(i, j, k)` triplet directly costs `O(n * m^2)` per type,
which is far too slow once `n` and `m` reach `1000`. The fix is to stop
thinking in triplets and start thinking in pairs: build a frequency map of
one array's values, then for every element of the other array ask "how
many index pairs from the map's array multiply to my square?" instead of
enumerating pairs one at a time.

For a fixed value `x`, the target product is `x * x`. Walking the _distinct_
values `v` present in the frequency map (sorted ascending) and stopping as
soon as `v * v` exceeds the target keeps each divisor considered exactly
once: when `v * v` equals the target, the pairs come from picking two
different indices of the same value, contributing `C(freq[v], 2)`; otherwise,
if the target is divisible by `v` and the complementary factor `target / v`
is also present, it contributes `freq[v] * freq[complement]`. Summing these
counts every unordered index pair once, which is exactly what `j < k`
requires. Running this routine once with `nums1` supplying the squares and
`nums2` supplying the frequency map handles type 1, and once with the
arrays swapped handles type 2; the two totals add directly. Because values
run up to `10^5`, a square reaches `10^10`, so the target and the running
count must be accumulated in 64-bit arithmetic even though the inputs are
32-bit.

**Complexity:** `O(n * m)` time (each element of one array scans at most
the distinct-value count of the other), `O(n + m)` space for the frequency
maps.
