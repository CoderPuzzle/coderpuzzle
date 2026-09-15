from typing import List, Optional


class Solution:
    def subarraySum(self, nums: List[int]) -> int:
        # Window i covers nums[max(0, i - nums[i]) .. i] inclusive, so a
        # running prefix sum answers each window in O(1) as
        # prefix[i + 1] - prefix[start]. n <= 100 and nums[i] <= 1000 cap
        # the total at 100 windows * 100 elements * 1000 = 10^7, well
        # inside 32 bits.
        prefix = [0]
        for value in nums:
            prefix.append(prefix[-1] + value)
        return sum(prefix[i + 1] - prefix[max(0, i - nums[i])] for i in range(len(nums)))
