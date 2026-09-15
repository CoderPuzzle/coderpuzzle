from typing import List


class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        # Sorting turns the count into a position: equal values form one run,
        # the majority's run is longer than half the array, and a run that
        # long always covers the middle index n // 2.
        ordered = sorted(nums)
        # Whatever order the input arrived in, the middle of the sorted order
        # is the majority.
        return ordered[len(ordered) // 2]
