# Solutions — Split Array Largest Sum

## Binary Search on the Answer

Instead of deciding the split directly, the solution binary-searches the value of the answer. If no subarray may exceed a candidate limit `L`, the minimal number of pieces needed is a monotone function of `L`: raising the limit can never increase the piece count. So there is a threshold value — the smallest `L` for which `k` pieces suffice — and that threshold is exactly the minimized largest sum.

The search runs over `[max(nums), sum(nums)]`: no single element can be split, so the answer is at least the maximum element, and one piece covering everything gives the upper bound. For a candidate `mid`, the feasibility check walks the array greedily, packing values into the current piece until adding the next one would exceed `mid`, then starting a new piece. This greedy is optimal for counting because keeping each piece as long as possible can never force more pieces later — any valid partition under limit `mid` has at least as many cut points as the greedy's.

If the greedy needs more than `k` pieces, `mid` is too small and the search moves the lower bound up; otherwise `mid` is achievable and the upper bound comes down. The loop converges on the smallest feasible limit with the standard `lo < hi` invariant, never evaluating an explicit final check.

The search on Example 1 (`nums = [7,2,5,10,8]`, `k = 2`) runs as follows:

1. The bounds open at `lo = max(nums) = 10` and `hi = sum(nums) = 32`.
2. `mid = 21`: the greedy packs `7+2+5 | 10+8` into 2 pieces, feasible, so `hi = 21`.
3. `mid = 15`: it needs `7+2+5 | 10 | 8` — 3 pieces, infeasible, so `lo = 16`.
4. `mid = 18`: `7+2+5 | 10+8` fits in 2 pieces, `hi = 18`; the next probe `mid = 17` needs 3 pieces again, so `lo = 18`.
5. `lo == hi == 18` — the split `[7,2,5]` and `[10,8]` with largest sum 18.

Edge cases are handled by the bounds themselves: `k` up to the array length (a limit of `max(nums)` always works then, since each element can be its own piece) and zeros in the array, which never break the greedy because a piece sum of zero fits under any nonnegative limit. Note the greedy assumes `value <= limit` always holds for a fresh piece, which is guaranteed since `lo` starts at `max(nums)`.

**Complexity:** `O(n log(sum(nums)))` time, `O(1)` space.
