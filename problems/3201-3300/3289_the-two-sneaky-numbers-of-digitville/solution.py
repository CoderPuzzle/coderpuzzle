from typing import List


class Solution:
    def getSneakyNumbers(self, nums: List[int]) -> List[int]:
        # Values all lie in 0..n-1, so a counter array indexed by value finds
        # the two count-2 entries; the ascending walk emits them in order.
        n = len(nums) - 2
        count = [0] * n
        for x in nums:
            count[x] += 1
        return [v for v in range(n) if count[v] == 2]
