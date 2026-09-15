from typing import List, Optional


class Solution:
    def minIncrease(self, nums: List[int]) -> int:
        # Special indices are strict peaks that can only be raised, so two of
        # them can never be adjacent: the achievable maximum is a largest
        # independent set of the interior positions, and the cheapest such set
        # is the answer. Raising i above both original neighbours costs
        # max(0, max(nums[i-1], nums[i+1]) + 1 - nums[i]) — a peak's neighbours
        # are never peaks themselves, so they keep their original values.
        n = len(nums)
        INF = 10**18
        # Best (count, cost) pair up to the current position, keyed by whether
        # that position is picked; the comparison is (max count, min cost).
        not_picked = (0, 0)
        picked = (-1, INF)
        for i in range(1, n - 1):
            cost = max(0, max(nums[i - 1], nums[i + 1]) + 1 - nums[i])
            # Picking i requires the previous position to be unpicked.
            cur_picked = (not_picked[0] + 1, not_picked[1] + cost)
            # Skipping i keeps whichever previous state is better.
            if picked[0] > not_picked[0] or (picked[0] == not_picked[0] and picked[1] < not_picked[1]):
                cur_not_picked = picked
            else:
                cur_not_picked = not_picked
            not_picked, picked = cur_not_picked, cur_picked
        if picked[0] > not_picked[0] or (picked[0] == not_picked[0] and picked[1] < not_picked[1]):
            return picked[1]
        return not_picked[1]
