from typing import List


class Solution:
    def maxFrequencyScore(self, nums: List[int], k: int) -> int:
        # After sorting, the elements worth converting to one value form a
        # contiguous window: the move cost of a set is minimized at its
        # median, and swapping any non-window member for a skipped in-between
        # element never costs more. Sliding a window [l, r] rightward, the
        # cheapest way to flatten it is to raise everything to the median
        # nums[(l + r) // 2], costing (median * left_count - left_sum) +
        # (right_sum - median * right_count) via prefix sums. The cost only
        # shrinks when the window shrinks, so l never moves backwards.
        # Costs reach n * span / 2 ~ 5 * 10^13 and k reaches 10^14: 64-bit
        # accumulators in the typed languages, and every intermediate stays
        # below 2^53, so JavaScript numbers remain exact.
        nums.sort()
        n = len(nums)
        pre = [0] * (n + 1)
        for i, v in enumerate(nums):
            pre[i + 1] = pre[i] + v
        best = 0
        l = 0
        for r in range(n):
            while True:
                mid = (l + r) // 2
                median = nums[mid]
                cost = median * (mid - l) - (pre[mid] - pre[l]) + (pre[r + 1] - pre[mid]) - median * (r + 1 - mid)
                if cost <= k:
                    break
                l += 1
            best = max(best, r - l + 1)
        return best
