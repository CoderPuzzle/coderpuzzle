# Solutions — Minimum Operations to Make All Array Elements Equal

## Sorting with Prefix Sums and Binary Search

For a target `q`, each element must move by `|nums[i] - q|` operations, so every query reduces to the sum of absolute differences between `q` and the whole array. Answering that naively per query costs `O(n * m)`, which is too slow; instead sort `nums` once and precompute its prefix sums, after which each query is one binary search plus constant-time arithmetic.

For query `q`, `bisect_left` yields `j`, the number of elements strictly smaller than `q`. The smaller elements all need raising to `q`, contributing `q * j - prefix[j]`; the rest need lowering, contributing `(prefix[n] - prefix[j]) - q * (n - j)`. Elements equal to `q` land on the right side but contribute zero either way, so the split is exact regardless of ties.

The preprocessing sort dominates; each of the `m` queries costs a single `O(log n)` search followed by `O(1)` arithmetic. Sums reach about `10^5 * 10^9 = 10^14`, which Python integers absorb exactly.

**Complexity:** `O(n log n + m log n)` time, `O(n)` space.
