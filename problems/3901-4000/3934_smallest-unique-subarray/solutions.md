# Solutions — Smallest Unique Subarray

Binary search the answer and count fixed-length subarrays using two rolling
hashes.

## Binary search with double rolling hashes

Precompute powers and prefix hashes under two different prime moduli. The hash
pair of any subarray is then obtained in constant time, so a hashmap can count
all subarrays of a chosen length in one scan. That length works if any hash
pair occurs exactly once. Using two independent residues makes accidental
identification of different subarrays negligible while keeping every
JavaScript multiplication below `2⁵³` for exact arithmetic.

If a unique subarray of length `L` exists and `L < n`, extending it by one
position on either available side remains unique. Feasibility is therefore
monotone, and binary search finds the smallest working length. The whole array
always occurs once, so an answer always exists.

**Complexity:** `O(n log n)` time, `O(n)` space.
