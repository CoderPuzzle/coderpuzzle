from typing import List


class Solution:
    def countBadPairs(self, nums: List[int]) -> int:
        # j - i != nums[j] - nums[i] rearranges to nums[j] - j !=
        # nums[i] - i: a pair is good exactly when the shifted values match,
        # so counting good pairs per shifted value and subtracting from all
        # pairs avoids touching bad pairs at all. Pair counts reach ~5e9,
        # past 32-bit range.
        counts: dict[int, int] = {}
        good = 0
        for i, value in enumerate(nums):
            shifted = value - i
            good += counts.get(shifted, 0)
            counts[shifted] = counts.get(shifted, 0) + 1
        n = len(nums)
        return n * (n - 1) // 2 - good
