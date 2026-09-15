from collections import defaultdict
from typing import List


class Solution:
    def waysToPartition(self, nums: List[int], k: int) -> int:
        total = sum(nums)
        right = defaultdict(int)
        prefix = 0
        for pivot in range(1, len(nums)):
            prefix += nums[pivot - 1]
            right[2 * prefix - total] += 1

        left = defaultdict(int)
        answer = right[0]
        prefix = 0
        for index, value in enumerate(nums):
            delta = k - value
            answer = max(answer, left[delta] + right[-delta])

            if index < len(nums) - 1:
                prefix += value
                difference = 2 * prefix - total
                right[difference] -= 1
                left[difference] += 1

        return answer
