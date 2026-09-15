from typing import List


class Solution:
    def bowlSubarrays(self, nums: List[int]) -> int:
        # A bowl is pinned by the maximum sitting strictly between its
        # rims: that element needs a strictly greater neighbour on both
        # sides, and those nearest greater elements are exactly the two
        # rims. Sweep left to right with a decreasing stack — when a value
        # pops an entry, it is that entry's next greater element and what
        # remains beneath names its previous greater one. The pop is a
        # bowl unless the stack emptied, i.e. no greater element on the
        # left; entries never popped never meet a greater element at all.
        count = 0
        stack = []
        for x in nums:
            while stack and stack[-1] < x:
                stack.pop()
                if stack:
                    count += 1
            stack.append(x)
        return count
