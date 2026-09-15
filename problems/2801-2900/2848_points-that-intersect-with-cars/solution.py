from typing import List, Optional


class Solution:
    def numberOfPoints(self, nums: List[List[int]]) -> int:
        # Sorted by start point, a car only gains coverage past the
        # rightmost point counted so far — add its uncovered suffix there
        # and extend that reach.
        nums.sort()
        total = 0
        reach = 0
        for start, end in nums:
            if end > reach:
                total += end - max(start, reach + 1) + 1
                reach = end
        return total
