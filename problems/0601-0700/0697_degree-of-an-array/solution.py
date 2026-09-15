from typing import List


class Solution:
    def findShortestSubArray(self, nums: List[int]) -> int:
        # The degree is a maximum frequency, and a window reaches it only by
        # holding every copy of some value at that frequency: drop one copy
        # and that value falls short. One pass records each value's count,
        # first index, and last index; the answer is then the tightest
        # first-to-last span among the values whose count equals the degree.
        count, first, last = {}, {}, {}
        for index, value in enumerate(nums):
            count[value] = count.get(value, 0) + 1
            if value not in first:
                first[value] = index
            last[value] = index
        degree = max(count.values())
        best = len(nums)
        for value, freq in count.items():
            if freq == degree:
                best = min(best, last[value] - first[value] + 1)
        return best
