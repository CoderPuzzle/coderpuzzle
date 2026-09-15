# Solutions — Prime Subtraction Operation

## Greedy Prime Subtraction

Think of scanning `nums` left to right while maintaining `prev`, the smallest
value the processed prefix can end on. A smaller prefix end is never worse for
the rest of the array: every later element only needs to exceed `prev`, so
keeping it minimal leaves strictly more room. For each element `x` there are
two moves: leave it untouched (final value `x`), or pick one prime `p < x` and
land on `x - p`. The best landing is produced by the largest prime that still
keeps the result above `prev`, i.e. the largest prime `p <= x - prev - 1`; its
result is smaller than any other valid choice yet still valid.

Finding that prime needs the primes below 1000 in sorted order, which a sieve
of Eratosthenes over `[0, max(nums)]` supplies once. One binary search per
element (`bisect_right` / `upper_bound` / `sort.SearchInts` /
`partition_point`, or a hand-rolled loop) locates the largest prime not
exceeding the bound; if none exists the element can only survive as-is, and
if even that fails against `prev` the answer is false.

**Complexity:** `O(n log n + max(nums))` time (sieve plus one binary search
per element), `O(max(nums))` space.
