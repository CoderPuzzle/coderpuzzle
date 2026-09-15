from typing import List


class Solution:
    def maximumStrongPairXor(self, nums: List[int]) -> int:
        # Try every unordered pair (the same integer twice is allowed, so
        # j >= i covers the (x, x) pairs too); keep the best XOR among the
        # pairs that satisfy the strong-pair condition.
        best = 0
        for i in range(len(nums)):
            for j in range(i, len(nums)):
                x, y = nums[i], nums[j]
                if abs(x - y) <= min(x, y):
                    best = max(best, x ^ y)
        return best
