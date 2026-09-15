from typing import List


class Solution:
    def maxAlternatingSum(self, nums: List[int]) -> int:
        # Two running optima over subsequences of the prefix: `even` is the
        # best alternating sum whose last picked element sits at an even
        # reindexed position, `odd` the best with one extra odd-position
        # element, so each new element costs two O(1) transitions.
        even, odd = 0, 0
        for x in nums:
            # Appending x to an odd-ending subsequence lands it even (+x);
            # appending to an even-ending one lands it odd (-x); either
            # state may also just persist.
            even, odd = max(even, odd + x), max(odd, even - x)
        return even
