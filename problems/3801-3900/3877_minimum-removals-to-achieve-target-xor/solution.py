from typing import List, Optional


class Solution:
    def minRemovals(self, nums: List[int], target: int) -> int:
        # dp[xor] = maximum number of elements we can KEEP with XOR == xor
        dp = {0: 0}
        for x in nums:
            new_dp = dict(dp)
            for xor_val, count in dp.items():
                nx = xor_val ^ x
                if count + 1 > new_dp.get(nx, -1):
                    new_dp[nx] = count + 1
            dp = new_dp
        if target in dp:
            return len(nums) - dp[target]
        return -1
