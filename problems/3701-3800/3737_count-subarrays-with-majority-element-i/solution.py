from typing import List


class Solution:
    def countMajoritySubarrays(self, nums: List[int], target: int) -> int:
        total = 0
        # Fix the left endpoint and grow the window one element at a time;
        # each step updates the running count of target in constant time.
        for start in range(len(nums)):
            count = 0
            for end in range(start, len(nums)):
                if nums[end] == target:
                    count += 1
                # target is the majority exactly when it holds strictly
                # more than half of the window: twice its count beats
                # the length.
                if 2 * count > end - start + 1:
                    total += 1
        return total
