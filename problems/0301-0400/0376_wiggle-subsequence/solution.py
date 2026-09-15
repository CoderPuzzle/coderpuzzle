from typing import List


class Solution:
    def wiggleMaxLength(self, nums: List[int]) -> int:
        # Only direction changes matter: start the count at the first
        # element and increment it once per strict flip of travel.
        count = 1
        direction = 0  # 1 while rising, -1 while falling, 0 before any move
        for i in range(1, len(nums)):
            # A fresh rise counts only after a fall (or at the start); an
            # equal or same-direction step changes nothing.
            if direction <= 0 and nums[i] > nums[i - 1]:
                count += 1
                direction = 1
            elif direction >= 0 and nums[i] < nums[i - 1]:
                count += 1
                direction = -1
        return count
