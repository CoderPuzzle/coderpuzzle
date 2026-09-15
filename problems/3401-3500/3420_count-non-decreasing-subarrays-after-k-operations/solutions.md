# Solutions — Count Non-Decreasing Subarrays After K Operations

## Right-to-Left Sliding Window with a Monotonic Stack

The cheapest way to make a subarray non-decreasing using increments is to raise every element up to the running maximum from the left: the minimum cost is `Σ (running_max(i) - nums[i])` over the subarray, and any other target profile costs at least as much. For a fixed left end this cost is non-decreasing as the right end grows, so for each `left` there is a farthest `right` such that every subarray `[left, r]` with `r ≤ right` is fixable within `k` — counting `right - left + 1` per left end sums exactly the answer.

The window is grown leftward, which lets a monotonic stack maintain the cost incrementally. The deque holds indices of the current running-max plateaus with values strictly decreasing from front to back; when a new `left` with value `nums[left]` arrives, every plateau with a smaller value is absorbed — its whole span of elements rises from that value to `nums[left]`, adding `(span length) · (nums[left] - old value)` to the accumulated cost — and `left` is pushed as the new front. When the cost exceeds `k`, the window is shrunk from the right: the rightmost element's cost contribution is exactly the current maximum `nums[dq[head]]` minus `nums[right]`, which is removed, advancing `head` past a plateau leader when it falls off the window.

A lazy head pointer means popped-from-the-front indices stay physically in the deque while being logically discarded, so both the absorption pops and the head advances are amortized constant — each index enters and leaves each end at most once over the whole sweep.

![Window costs as "raise everything to the running max" for [6,3,1,2,4,4]: at left = 1 the cost is 3, and after 6 arrives the window shrinks to [6,3] to fit k = 7.](figures/solution-window-cost.svg)

Stepping example 1 (`nums = [6,3,1,2,4,4]`, `k = 7`) through the sweep:

1. `left` runs 5 → 2: each value is a new running minimum, so the deque just stacks plateaus `[4][4][2][1]` and `cnt` stays 0, contributing 1 + 2 + 3 + 4 = 10 subarrays.
2. `left = 1` (value 3): the plateaus holding 1 and 2 are absorbed — raising index 2's `1` to 3 costs 2, index 3's `2` to 3 costs 1 — so `cnt = 3 ≤ 7` and the window `[1..5]` contributes 5 more (total 15).
3. `left = 0` (value 6): absorbing every remaining plateau adds 9 + 2 + 2, driving `cnt` to 16.
4. Since 16 > 7 the right end retreats: index 5 pays 6 − 4 = 2, index 4 pays 2, index 3 pays 6 − 2 = 4, index 2 pays 6 − 1 = 5 — leaving `cnt = 3` with the window `[0..1]`.
5. That window contributes `right - left + 1 = 2`, for a total of 17.

Edge cases: `k` may exceed any needed cost, in which case the window simply never shrinks and the answer is the full triangular count; equal adjacent values form shared plateaus (the pop condition is strict `<`), and all values fitting in 32 bits keeps the cost arithmetic exact — costs can reach ~`10⁵ · 10⁹` but stay well within 64-bit range.

**Complexity:** `O(n)` time, `O(n)` space.
