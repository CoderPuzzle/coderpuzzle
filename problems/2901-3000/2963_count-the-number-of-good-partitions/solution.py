from typing import List, Optional


class Solution:
    def numberOfGoodPartitions(self, nums: List[int]) -> int:
        # A value may not straddle a cut, so every free cut sits at an index
        # that has already seen the last occurrence of every value to its
        # left; each such gap independently doubles the count, giving
        # 2^(number of gaps).
        MOD = 10**9 + 7
        last = {}
        for i, v in enumerate(nums):
            last[v] = i
        result = 1
        reach = 0
        for i in range(len(nums) - 1):
            if last[nums[i]] > reach:
                reach = last[nums[i]]
            if reach == i:
                result = result * 2 % MOD
        return result
