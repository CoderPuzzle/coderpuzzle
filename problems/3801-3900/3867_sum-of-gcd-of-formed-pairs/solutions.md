# Solutions — Sum of GCD of Formed Pairs

## Running max, sort, two-pointer pairing

The construction of `prefixGcd` is a one-pass running maximum: at index i
the value is `gcd(nums[i], mxi)` where `mxi` is the largest element seen so
far, which a single variable tracks. The gcd computation uses the standard
Euclidean algorithm, constant time per element for values of this size.

Once `prefixGcd` is sorted, the pairing rule — smallest unpaired with
largest unpaired — is exactly a two-pointer walk from the two ends of the
sorted array. Each iteration fixes one pair, adds `gcd(lo, hi)` to a
running sum, and advances both pointers inward; the loop stops when the
pointers meet, so an odd-length array's middle element is naturally skipped
without any special case.

The answer can be large: with `n` up to `10⁵` there are as many as `5 ×
10⁴` pairs, each gcd as large as `10⁹`, so the total reaches about `5 ×
10¹³` — far beyond a 32-bit integer, hence a 64-bit return in every
language. In JavaScript the same bound sits well below `2⁵³`, so ordinary
number arithmetic is exact. The sort dominates the work.

**Complexity:** `O(n log n)` time, `O(n)` space.
