from typing import List, Optional


class Solution:
    def nextGreaterElement(self, nums1: List[int], nums2: List[int]) -> List[int]:
        # One scan of nums2 answers every query: the stack holds values
        # still waiting for their next greater element.
        next_greater = {}
        stack = []
        for value in nums2:
            # The current value is the FIRST greater value to the right of
            # each popped element (anything closer would have popped them
            # already); each element is pushed once, popped at most once.
            while stack and stack[-1] < value:
                next_greater[stack.pop()] = value
            stack.append(value)
        # Whatever survives on the stack has nothing greater to its right.
        for value in stack:
            next_greater[value] = -1
        # Values are unique and nums1 is a subset of nums2, so every
        # lookup hits.
        return [next_greater[value] for value in nums1]
