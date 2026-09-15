from bisect import bisect_right
from typing import List


class Solution:
    def minOperations(self, nums: List[int]) -> int:
        # Each removal takes out one strictly increasing subsequence, so a
        # non-increasing chain (x >= y in order) must span distinct removals;
        # by Dilworth's theorem the answer is the longest non-increasing
        # subsequence length.
        tails = []
        for x in nums:
            # Negate and bisect_right: equal values extend the same pile,
            # turning patience sorting's "longest strictly increasing" into
            # "longest non-increasing" for the original values.
            v = -x
            pos = bisect_right(tails, v)
            # The value opens a new pile (append) or replaces the leftmost
            # pile top it can sit on; piles stay sorted, and their count is
            # the answer.
            if pos == len(tails):
                tails.append(v)
            else:
                tails[pos] = v
        return len(tails)
