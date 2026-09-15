from typing import List


class Solution:
    def minArraySum(self, nums: List[int]) -> int:
        limit = 100000
        present = [False] * (limit + 1)
        for value in nums:
            present[value] = True

        best = [0] * (limit + 1)
        for divisor in range(1, limit + 1):
            if not present[divisor]:
                continue
            for multiple in range(divisor, limit + 1, divisor):
                if present[multiple] and (best[multiple] == 0 or divisor < best[multiple]):
                    best[multiple] = divisor

        return sum(best[value] for value in nums)
