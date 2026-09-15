# Solutions — Count Triplets That Can Form Two Arrays of Equal XOR

## Prefix XOR With Hash Maps

A pair of equal-XOR halves exists exactly when the XOR of the whole segment arr[i..k] is zero, since a equals b precisely when a XOR b equals zero. Writing P for the running prefix XOR, the segment from i to k has XOR zero exactly when P after position k equals P after position i - 1. For such a pair of equal prefix values at positions p < j (p = -1 denoting the empty prefix), every split between them works: the segment from p + 1 to j has length j - p and contributes j - p - 1 triplets.

Instead of testing all pairs of positions, the solution scans once and keeps two hash maps keyed by prefix value: how many times the value has occurred, and the sum of (index + 1) over those occurrences. When the running prefix after consuming position j has been seen before, it adds j times the occurrence count minus the stored index sum, which is algebraically the sum of j - p - 1 over all earlier positions p holding the same prefix. Both maps are then updated with the current occurrence, and they are seeded with the empty prefix (value 0, count 1, index sum 0) so segments beginning at index 0 are counted as well.

This counts every triplet exactly once, because a triplet is determined by its outer positions p = i - 1 and k together with the split j, and the formula enumerates precisely those splits. Element values can be as large as 10^8, but there are only n + 1 actual prefix values, so the dictionaries stay small and each lookup is constant time on average.

**Complexity:** `O(n)` time, `O(n)` space.
