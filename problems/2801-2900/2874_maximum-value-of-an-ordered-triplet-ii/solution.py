from typing import List


class Solution:
    def maximumTripletValue(self, nums: List[int]) -> int:
        # prefix_max[i] is the largest value at or before i, suffix_max[i] the
        # largest value at or after i, so any middle index j can look both ways.
        n = len(nums)
        prefix_max = [0] * n
        prefix_max[0] = nums[0]
        for i in range(1, n):
            prefix_max[i] = max(prefix_max[i - 1], nums[i])
        suffix_max = [0] * n
        suffix_max[n - 1] = nums[n - 1]
        for i in range(n - 2, -1, -1):
            suffix_max[i] = max(suffix_max[i + 1], nums[i])

        # For a fixed middle j the best choice of i < j is prefix_max[j - 1]
        # and of k > j is suffix_max[j + 1]; the clamp keeps an all-negative
        # answer at 0.
        ans = 0
        for j in range(1, n - 1):
            ans = max(ans, (prefix_max[j - 1] - nums[j]) * suffix_max[j + 1])
        return ans
