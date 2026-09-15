from typing import List


class Solution:
    def minimumRightShifts(self, nums: List[int]) -> int:
        n = len(nums)
        descents = 0
        pivot = -1
        for i in range(n):
            nxt = (i + 1) % n
            if nums[i] > nums[nxt]:
                descents += 1
                pivot = i
        if descents == 0:
            return 0
        if descents > 1:
            return -1
        return n - 1 - pivot
