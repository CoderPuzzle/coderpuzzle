from typing import List
from math import gcd


class Solution:
    def minimumSplits(self, nums: List[int]) -> int:
        # A block's gcd only ever shrinks as it absorbs elements, so the
        # greedy is forced: keep extending the open block while its running
        # gcd stays above 1, and cut exactly when the next element would
        # drop it to 1. Cutting earlier can never help — any split of a
        # still-good prefix leaves the right part no better off.
        parts = 1
        run = nums[0]
        for v in nums[1:]:
            run = gcd(run, v)
            if run == 1:
                parts += 1
                run = v
        return parts
