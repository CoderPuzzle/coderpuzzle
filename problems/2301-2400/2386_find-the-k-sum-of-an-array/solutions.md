# Solutions — Find the K-Sum of an Array

## Heap enumeration of subset sums

The largest possible subsequence sum is `base`, the sum of all positive elements. Every other subsequence sum is `base` minus the total absolute value of some subset of elements: omitting a positive `x` loses `x`, and including a negative `x` loses `|x|`. This bijection turns the problem around — the `k`-th largest subsequence sum equals `base` minus the `k`-th smallest subset sum of the absolute values, where the empty subset (sum 0) is the smallest.

Enumerating those smallest subset sums in order is done with a min-heap over pairs `(sum, idx)`, where `idx` is the largest index used by the subset, with the absolute values sorted increasingly. The heap is seeded with the single smallest element. Popping `(cur, idx)` yields the next smallest subset, and it is expanded two ways: replace the last chosen element with the next one (`cur - costs[idx] + costs[idx + 1]`, index `idx + 1`) or keep it and also take the next one (`cur + costs[idx + 1]`, index `idx + 1`). This classic two-branch expansion generates every subset exactly once and in non-decreasing order, so no deduplication is needed.

The empty subset counts as the first smallest, so the counter starts at 1 and the loop pops until the `k`-th smallest is reached, returning `base - cur`. The special case `k == 1` returns `base` immediately. Since `k` is capped at 2000, the heap never grows beyond about `2k` entries.

**Complexity:** `O(n log n + k log k)` time, `O(n + k)` space.
