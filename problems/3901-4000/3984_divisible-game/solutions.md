# Solutions — Divisible Game

## Divisor candidates with Kadane

For a fixed `k`, replace each element by itself when it is divisible by `k`
and by its negation otherwise. The best `[l, r]` is then the maximum non-empty
subarray sum of this transformed array.

Only divisors of the input values can change the transformed array, plus the
fallback `k = 2`. Enumerate those candidates, run Kadane's algorithm for
each, and keep the largest score with the smallest `k` on ties.

**Complexity:** `O(d * n)` time, where `d` is the number of divisor
candidates, and `O(d)` space.
