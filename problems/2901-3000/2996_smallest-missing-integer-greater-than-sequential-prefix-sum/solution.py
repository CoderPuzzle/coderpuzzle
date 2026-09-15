from typing import List, Optional


class Solution:
    def missingInteger(self, nums: List[int]) -> int:
        # The floor of the answer is the sum of the longest prefix in which
        # every value is exactly its predecessor plus one; the first break
        # in that progression ends the prefix, so one scan settles it.
        total = nums[0]
        for i in range(1, len(nums)):
            if nums[i] != nums[i - 1] + 1:
                break
            total += nums[i]
        # From that floor, step upward past every value the array holds;
        # the first gap is the smallest missing integer.
        present = set(nums)
        while total in present:
            total += 1
        return total
