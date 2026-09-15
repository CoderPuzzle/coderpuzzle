# Solutions — Minimum Cost to Equalize Arrays Using Swaps

Swaps inside a single array are free, so the positions of elements never
matter; only the multiset of values in each array matters. Equalizing the
arrays means giving both of them the same multiset. For a value v that
multiset must hold half as many copies of v as appear across the two arrays
combined, so the combined count of every value must be even — otherwise the
arrays can never be made identical and the answer is -1.

## Frequency mismatch count

Count how often each value appears in nums1 and nums2. When every combined
count is even, the arrays can be equalized, and the only paid operation is a
cross swap. A cross swap exchanges one element of nums1 with one element of
nums2 at the same index, and because within-array swaps are free we may
always arrange a surplus element of nums1 to share an index with a surplus
element of nums2 before swapping. One cross swap therefore fixes one
surplus placement in each array at the same time.

The number of elements that must leave nums1 is half of the sum of the
positive frequency differences, and since both arrays hold n elements the
positive and negative differences balance, making that sum exactly one
quarter of the total difference. Summing |cnt1[v] - cnt2[v]| over every value
that appears and dividing by 4 gives the minimum number of cross swaps, and
each of those swaps costs exactly 1.

Two linear passes build the frequency tables and a single sweep over the
distinct values produces the answer, so the time and space are both linear in
n. Every count stays at most n <= 8 * 10⁴, so ordinary 32-bit arithmetic
carries the computation in every language.

**Complexity:** `O(n)` time, `O(n)` space.
