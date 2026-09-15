from typing import List


class Solution:
    def rotateElements(self, nums: List[int], k: int) -> List[int]:
        # Gather the non-negative values in scan order, compute the effective
        # left shift k % m once, then scatter values[(j + shift) % m] into the
        # j-th originally non-negative slot — negatives are never touched.
        values = [value for value in nums if value >= 0]
        m = len(values)
        result = list(nums)
        if m == 0:
            return result
        shift = k % m
        at = 0
        for index, value in enumerate(nums):
            if value >= 0:
                result[index] = values[(at + shift) % m]
                at += 1
        return result
