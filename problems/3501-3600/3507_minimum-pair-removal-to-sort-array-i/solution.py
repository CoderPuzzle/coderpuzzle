from typing import List


class Solution:
    def minimumPairRemoval(self, nums: List[int]) -> int:
        # The operation is forced: merge the minimum-sum adjacent pair,
        # leftmost on ties, until the array is non-decreasing. Just
        # simulate -- with n <= 50 a full rescan per step is trivial.
        arr = list(nums)
        ops = 0
        while any(arr[i] > arr[i + 1] for i in range(len(arr) - 1)):
            best = 0
            for i in range(1, len(arr) - 1):
                if arr[i] + arr[i + 1] < arr[best] + arr[best + 1]:
                    best = i
            # strict < keeps the earliest of equal-sum pairs
            arr[best : best + 2] = [arr[best] + arr[best + 1]]
            ops += 1
        return ops
