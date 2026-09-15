from collections import deque
from typing import List


class Solution:
    def anagramMappings(self, nums1: List[int], nums2: List[int]) -> List[int]:
        # Each element of nums1 must land on an index of nums2 that holds
        # the same value, and with repeats no index can serve two elements.
        # One pass files every value's indices in nums2 into a queue, left
        # to right; the second walk hands each element of nums1 the front
        # of its queue and pops it, so every copy takes the leftmost
        # position not claimed by an earlier copy.
        positions = {}
        for index, value in enumerate(nums2):
            positions.setdefault(value, deque()).append(index)
        return [positions[value].popleft() for value in nums1]
