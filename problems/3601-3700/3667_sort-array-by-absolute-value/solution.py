from typing import List


class Solution:
    def sortByAbsoluteValue(self, nums: List[int]) -> List[int]:
        # Key (|value|, value): magnitude orders the array, and the signed
        # value breaks every magnitude tie so -x always lands before x.
        nums.sort(key=lambda value: (abs(value), value))
        # The tie-break makes the ordering total on distinct outcomes, so
        # the result is unique regardless of the sort's stability.
        return nums
