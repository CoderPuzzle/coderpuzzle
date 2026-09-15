from typing import List, Optional


class Solution:
    def minimumReplacement(self, nums: List[int]) -> int:
        # Splitting only shrinks numbers, so never touch the last element:
        # keep `bound` = max value allowed here given a sorted suffix.
        ops = 0
        bound = nums[-1]
        for x in reversed(nums[:-1]):
            if x <= bound:
                # Already fits the sorted suffix; it tightens the bound.
                bound = x
            else:
                # Fewest pieces covering sum x with each <= bound; k even
                # pieces leave the largest at ceil(x/k) <= bound.
                k = (x + bound - 1) // bound
                ops += k - 1
                # Even split maximizes the smallest piece (floor(x/k)),
                # leaving the most room for elements further left.
                bound = x // k
        return ops
