from typing import List, Optional


class Solution:
    def widestPairOfIndices(self, nums1: List[int], nums2: List[int]) -> int:
        # Track the running prefix difference (sum1 - sum2); a range has
        # equal sums in both arrays iff the difference repeats. Seed the
        # empty prefix's value 0 at -1 so pairs starting at index 0 measure
        # correctly.
        first = {0: -1}
        diff = 0
        best = 0
        for i, (a, b) in enumerate(zip(nums1, nums2)):
            diff += a - b
            # A repeated difference spans a valid pair; keeping only each
            # value's FIRST occurrence maximizes every later span using it.
            if diff in first:
                best = max(best, i - first[diff])
            else:
                first[diff] = i
        return best
