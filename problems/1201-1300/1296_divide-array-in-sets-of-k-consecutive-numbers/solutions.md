# Solutions — Divide Array in Sets of K Consecutive Numbers

## Greedy Consumption from the Smallest Value

Consider the smallest value `v` still present with a positive count. Every set of k consecutive numbers that contains `v` must be exactly `{v, v+1, ..., v+k−1}` — there is no choice, because v is the smallest unused value and any set containing it extends upward from it. Since each of the `counts[v]` copies of `v` belongs to a distinct set, the algorithm must consume exactly `counts[v]` runs starting at `v`; if any of `v+1, ..., v+k−1` has fewer than `counts[v]` remaining copies, no valid division exists and the answer is false. Committing to this forced move can never be wrong, which makes the greedy exhaustive in effect.

The implementation maintains a `Counter`, walks the distinct values in sorted order, skips values whose count has already been driven to zero by earlier runs, and for each remaining value either subtracts `need` from the k consecutive counts or fails. Values are processed smallest-first so that whenever a run is charged against a value, that value is necessarily the current minimum remaining — the precondition the argument requires.

Two quick edge checks round it out: if `len(nums)` is not divisible by `k`, an immediate false avoids all work; and counts that drop below zero are caught by the same `< need` comparison that detects gaps.

Each inner-loop iteration either fails outright or permanently removes at least one element from the multiset, so the consumption sweep is linear in `n` once the distinct values are sorted.

**Complexity:** `O(n log n)` time, `O(n)` space.
