# Solutions

The solution uses cumulative resource arithmetic.

## Cumulative resource arithmetic

After any prefix has been processed, the available resources equal the initial `k`, plus `k` for every operation, minus the prefix sum consumed. Consequently, the total number of operations is the smallest count that makes the final cumulative supply cover the sum of `nums`; intermediate prefixes cannot require more because all demands are positive.

If that operation count is `c`, their costs are exactly `1` through `c`, whose sum is `c(c + 1) / 2`. Compute the count and triangular sum with wide integer arithmetic, then reduce the answer modulo 10⁹ + 7.

**Complexity:** O(n) time and O(1) space.
