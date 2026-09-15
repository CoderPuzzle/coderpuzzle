from typing import List, Optional


class Solution:
    def longestNiceSubarray(self, nums: List[int]) -> int:
        # a lone element is always nice: best starts at 1, mask starts empty
        best = 1
        left = 0
        window_or = 0
        # nice <=> no two members share a bit <=> the window's OR mask is
        # disjoint from the incoming value: one AND test per step
        for right, value in enumerate(nums):
            # conflict: drop from the left; XOR undoes the earlier | because
            # disjointness guarantees the element's bits are private to it
            while window_or & value:
                window_or ^= nums[left]
                left += 1
            window_or |= value
            if right - left + 1 > best:
                best = right - left + 1
        return best
