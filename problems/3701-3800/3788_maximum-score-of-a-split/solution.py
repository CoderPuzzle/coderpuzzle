from typing import List


class Solution:
    def maximumScore(self, nums: List[int]) -> int:
        n = len(nums)
        total = sum(nums)
        # Sweep the split indices right to left carrying two running views:
        # p holds prefixSum(i) and suffix_min holds the minimum of
        # nums[i + 1..n - 1]. The last valid split seeds the answer.
        p = total - nums[n - 1]
        suffix_min = nums[n - 1]
        best = p - suffix_min
        for i in range(n - 3, -1, -1):
            # Moving to split i folds nums[i + 1] into both views.
            suffix_min = min(suffix_min, nums[i + 1])
            p -= nums[i + 1]
            score = p - suffix_min
            if score > best:
                best = score
        return best
