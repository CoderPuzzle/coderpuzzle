# Solutions — Partition to K Equal Sum Subsets

## Memoized Bitmask Backtracking

Every subset must sum to `total / k`, so the first checks are divisibility of `total` by `k` and whether the largest element already exceeds the target — either failure means no partition exists. The search then fills one subset at a time: the state is a bitmask of which elements have been placed together with `curr`, the partial sum of the subset currently being filled. At each state the code tries every unused element that still fits under the target; when `curr` lands exactly on the target it recurses with `curr = 0`, starting the next subset, and a full mask means all elements were placed, so the answer is true. Sorting the values in descending order first is a pruning device: large elements are the hardest to place, so putting them in early cuts off hopeless branches quickly.

Without memoization the same partial assignment is re-explored under many orderings of equivalent choices. The fix is to memoize on `(mask, curr)`. A useful subtlety keeps this cheap: completed subsets each sum to exactly the target, so `curr` is always the sum of the used elements taken modulo the target — at most one live `curr` value per mask, hence at most `2^n` distinct memoized states. Each state tries at most `n` placements, and the `curr + nums[i] <= target` check skips placements that would overflow the current subset.

With `n <= 16` this is at most 65,536 states; the constraint that each element's frequency is at most 4 keeps duplicate-heavy inputs from degenerating further. `k = 1` degenerates to a single subset holding everything and always succeeds once the divisibility check passes.

Example 1 (`nums = [4,3,2,3,5,2,1]`, `k = 4`) fills the four subsets one at a time:

1. The total 20 divides by 4, so the target is 5; sorted descending the values are 5, 4, 3, 3, 2, 2, 1.
2. Subset 1 takes the 5: bit 0 is set, `curr` hits the target, and the state recurses with `curr = 0`.
3. Subset 2 takes 4 then 1 — bits {1, 6}; subset 3 takes 3 then 2 — bits {2, 4}; subset 4 takes the remaining 3 and 2 — bits {3, 5}.
4. Every element's bit is now set, so the full-mask check succeeds and the answer is true.

**Complexity:** `O(n · 2^n)` time, `O(2^n)` space.
