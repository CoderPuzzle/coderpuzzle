from typing import List, Optional


class Solution:
    def minimumSum(self, nums: List[int]) -> int:
        # For a fixed peak j the best i is the smallest value left of j and
        # the best k the smallest value right of j, so prefix and suffix
        # minima settle both sides in one array each.
        n = len(nums)
        prefix_min = [0] * n
        prefix_min[0] = nums[0]
        for i in range(1, n):
            prefix_min[i] = min(prefix_min[i - 1], nums[i])
        suffix_min = [0] * n
        suffix_min[n - 1] = nums[n - 1]
        for i in range(n - 2, -1, -1):
            suffix_min[i] = min(suffix_min[i + 1], nums[i])
        # Every interior index is tried as the peak; the strict inequalities
        # guard against equal shoulders, and -1 survives when none qualifies.
        best = -1
        for j in range(1, n - 1):
            left = prefix_min[j - 1]
            right = suffix_min[j + 1]
            if left < nums[j] and right < nums[j]:
                total = left + nums[j] + right
                if best == -1 or total < best:
                    best = total
        return best
