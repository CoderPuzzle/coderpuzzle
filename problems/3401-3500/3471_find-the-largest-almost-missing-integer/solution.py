from typing import List


class Solution:
    def largestInteger(self, nums: List[int], k: int) -> int:
        # One counter per possible value (0..50): how many distinct windows
        # of size k contain it.
        count = [0] * 51
        stamp = [-1] * 51
        for start in range(len(nums) - k + 1):
            # Dedup inside the window with a stamp: a value repeated within
            # one window still counts once there.
            for value in nums[start : start + k]:
                if stamp[value] != start:
                    stamp[value] = start
                    count[value] += 1
        # Scan down from the largest possible value: first hit wins.
        for value in range(50, -1, -1):
            if count[value] == 1:
                return value
        return -1
