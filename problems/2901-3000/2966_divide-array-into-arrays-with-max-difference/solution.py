from typing import List, Optional


class Solution:
    def divideArray(self, nums: List[int], k: int) -> List[List[int]]:
        # Sorting is forced: the global minimum may only share a group with
        # the two values closest above it, and inductively every valid
        # division groups consecutive sorted values — so sort and check
        # each consecutive triple's spread (last minus first is the widest).
        nums.sort()
        result = []
        for i in range(0, len(nums), 3):
            if nums[i + 2] - nums[i] > k:
                return []
            result.append(nums[i : i + 3])
        return result
