from typing import List


class Solution:
    def numberGame(self, nums: List[int]) -> List[int]:
        # Each round hands Alice the round's smallest value and Bob the next
        # smallest, but Bob appends first — so the sorted array with every
        # adjacent pair swapped is exactly arr.
        arr = sorted(nums)
        for i in range(0, len(arr), 2):
            arr[i], arr[i + 1] = arr[i + 1], arr[i]
        return arr
