from typing import List


class Solution:
    def minAbsoluteDifference(self, nums: List[int]) -> int:
        # Track the most recent 1 and most recent 2 seen so far; the closest
        # 1/2 pair is always caught the moment its second element is scanned.
        last_one = -1
        last_two = -1
        best = -1
        for index, value in enumerate(nums):
            if value == 1:
                if last_two != -1:
                    distance = index - last_two
                    if best == -1 or distance < best:
                        best = distance
                last_one = index
            elif value == 2:
                if last_one != -1:
                    distance = index - last_one
                    if best == -1 or distance < best:
                        best = distance
                last_two = index
        return best
