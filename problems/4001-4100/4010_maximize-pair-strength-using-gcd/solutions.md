# Solutions — Maximize Pair Strength Using GCD

## Brute force over every index pair

With `n` at most 2000 there are fewer than two million distinct index
pairs, so the direct route fits easily: try every pair of distinct
indices `(i, j)`, compute `g = gcd(nums[i], nums[j])`, and score the
pair as `(nums[i] * nums[j]) / g²`. The division is always exact —
`g` divides both factors, so `g²` divides their product — and a pair
of equal values collapses to `v * v / v² = 1`, which is why
`[3,3]` scores 1.

The only care point is width. Two coprime values near the `10⁵` bound
produce a product just under `10¹⁰`, past what a 32-bit integer can
hold, so fixed-width languages widen to 64 bits before multiplying.
Python integers are arbitrary precision, and JavaScript numbers are
exact up to `2⁵³`, which comfortably covers `10¹⁰`.

Scanning all pairs and keeping the largest strength seen gives the
answer. The gcd of two values at most `10⁵` is found in a handful of
Euclid steps, so the whole scan stays fast even in interpreted
runtimes.

**Complexity:** `O(n² log V)` time, `O(1)` space.
