from typing import List


class Solution:
    def pivotArray(self, nums: List[int], pivot: int) -> List[int]:
        # Stable three-way partition: gather each comparison class in its
        # original order and concatenate, which preserves the relative order
        # inside the less and greater groups by construction.
        less, equal, greater = [], [], []
        for value in nums:
            if value < pivot:
                less.append(value)
            elif value > pivot:
                greater.append(value)
            else:
                equal.append(value)
        return less + equal + greater
