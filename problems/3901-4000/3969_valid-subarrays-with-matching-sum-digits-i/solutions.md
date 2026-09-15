# Solutions — Valid Subarrays With Matching Sum Digits I

Direct quadratic enumeration with a running sum, digit-checking every subarray sum.

## Quadratic running-sum enumeration

Fix the left endpoint and extend the right endpoint while maintaining the
current subarray sum. Its last digit is `sum % 10`; repeatedly dividing a
copy of the sum by 10 yields its first digit. Count the subarray when both
digits equal `x`.

The largest sum is `1500 * 10⁹ = 1.5 * 10¹²`, so sums use 64-bit arithmetic.
This bound is also below `2⁵³`, making JavaScript number operations exact.

**Complexity:** `O(n²)` time, `O(1)` space.
