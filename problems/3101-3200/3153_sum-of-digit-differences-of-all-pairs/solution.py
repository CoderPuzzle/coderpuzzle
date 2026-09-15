from typing import List


class Solution:
    def sumDigitDifferences(self, nums: List[int]) -> int:
        n = len(nums)
        total = 0
        place = 1
        while nums[0] // place > 0:
            counts = [0] * 10
            for num in nums:
                counts[num // place % 10] += 1
            total += sum(count * (n - count) for count in counts) // 2
            place *= 10
        return total
