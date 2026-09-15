from typing import List


class Solution:
    def numberOfArithmeticSlices(self, nums: List[int]) -> int:
        # Slices are counted by their right end: an element that keeps the run
        # arithmetic extends every slice ending one step earlier plus adds a
        # fresh length-3 one, so current steps up by one each time.
        total = 0
        current = 0
        for i in range(2, len(nums)):
            if nums[i] - nums[i - 1] == nums[i - 1] - nums[i - 2]:
                current += 1
                total += current
            else:
                # The run is broken; no slice crosses the new difference.
                current = 0
        return total
