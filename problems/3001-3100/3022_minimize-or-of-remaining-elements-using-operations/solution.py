from typing import List


class Solution:
    def minOrAfterOperations(self, nums: List[int], k: int) -> int:
        n = len(nums)
        total = 0
        for value in nums:
            total |= value

        def groups_for(forbidden: int):
            groups = 0
            running = -1
            for value in nums:
                running &= value
                if running & forbidden == 0:
                    groups += 1
                    running = -1
            if running != -1 and groups == 0:
                return None
            return groups

        forbidden = 0
        for bit in range(29, -1, -1):
            candidate = forbidden | (1 << bit)
            groups = groups_for(candidate)
            if groups is not None and n - groups <= k:
                forbidden = candidate
        return total & ~forbidden
