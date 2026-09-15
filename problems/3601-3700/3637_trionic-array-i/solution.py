from typing import List


class Solution:
    def isTrionic(self, nums: List[int]) -> bool:
        # Walk the leading strictly increasing stretch; any valid cut point p
        # must land exactly where this rise stops, because the mandatory
        # descent out of p is what ends it.
        n = len(nums)
        i = 1
        while i < n and nums[i] > nums[i - 1]:
            i += 1
        # The peak needs company on both sides: at least one rising step
        # before it, room before the last index, and a strict drop after it.
        if i == 1 or i == n or nums[i] == nums[i - 1]:
            return False
        # Walk the descent from the peak; where it stops is the valley q.
        j = i + 1
        while j < n and nums[j] < nums[j - 1]:
            j += 1
        # The valley must leave room for a final strict rise.
        if j == n or nums[j] == nums[j - 1]:
            return False
        # The rest must climb without interruption, all the way to the end.
        k = j + 1
        while k < n and nums[k] > nums[k - 1]:
            k += 1
        return k == n
