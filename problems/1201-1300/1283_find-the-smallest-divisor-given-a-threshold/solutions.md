# Solutions — Find the Smallest Divisor Given a Threshold

## Binary Search on the Divisor

The sum of ceiled divisions is a non-increasing function of the divisor: enlarging the divisor can only make each `ceil(x / d)` smaller or leave it unchanged. This monotonicity means the predicate "sum for divisor d is at most `threshold`" is false for small divisors and true for large ones, so the smallest valid divisor can be found with a standard lower-bound binary search over the candidate range `[1, max(nums)]`. Divisors above `max(nums)` never need consideration because every term is already 1 there and the constraints guarantee that sum is acceptable.

Each evaluation of a candidate computes `sum((x + d − 1) // d)` — the classic integer trick for ceiling division without floating point. The search shrinks the range until `lo == hi`, which is the first divisor whose sum does not exceed the threshold.

The bounds are safe: `lo` starts at 1 (divisors are positive integers) and `hi` at `max(nums)` (beyond which the sum stops changing). The problem guarantees an answer exists, so the loop always terminates on a valid divisor.

**Complexity:** `O(n · log(max(nums)))` time, `O(1)` space.
