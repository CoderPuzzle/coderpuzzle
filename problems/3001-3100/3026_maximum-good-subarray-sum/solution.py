from typing import List, Optional


class Solution:
    def maximumSubarraySum(self, nums: List[int], k: int) -> int:
        best = {nums[0]: 0}  # value -> minimum prefix sum P[i] for a start i
        prefix = 0
        ans = None
        n = len(nums)
        for j in range(n):
            prefix += nums[j]  # P[j+1]
            for candidate in (nums[j] - k, nums[j] + k):
                if candidate in best:
                    value = prefix - best[candidate]
                    if ans is None or value > ans:
                        ans = value
            if j + 1 < n:
                if nums[j + 1] not in best or prefix < best[nums[j + 1]]:
                    best[nums[j + 1]] = prefix
        return ans if ans is not None else 0
