# Solutions — Widest Possible Fence

## Frequency map with pair-sum buckets

Fix the fence height `h`. Every plank that already has height `h` joins directly, so the singles contribute `f[h]`; a plank of any other height can only enter as half of a pair summing to `h`. A height-`h` plank itself can never be in such a pair — its partner would need height `0` — so singles and pairs draw on disjoint planks and their counts simply add. For distinct heights `x < h - x` at most `min(f[x], f[h-x])` disjoint pairs exist, and when `x == h - x` a value can cover only `f[x] / 2` pairs, leaving an odd leftover unused; equal heights may still combine because "distinct" means distinct planks, not distinct values. Since different height pairs share no planks, adding these maxima per candidate `h` is exact, not just an upper bound.

Rather than rescanning for every candidate height, accumulate each unordered pair of heights once into a bucket keyed by its sum: `bucket[x + y] += min(f[x], f[y])`, or `bucket[2x] += f[x] / 2` when `x == y`. Any achievable fence height is either an original height or the sum of two planks, so the answer is the largest `f[h] + bucket[h]` over all keys of the two maps — always at least 1, since a lone plank is already a width-1 fence.

**Complexity:** `O(n²)` time, `O(n²)` space.
