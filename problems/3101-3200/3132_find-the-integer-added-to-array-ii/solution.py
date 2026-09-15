from collections import Counter
from typing import List


class Solution:
    def minimumAddedInteger(self, nums1: List[int], nums2: List[int]) -> int:
        # Sorted correspondence forces x = min(nums2) - kept_min, and two
        # removals leave the kept minimum at sorted index <= 2, so only the
        # three candidates nums2_min - sorted(nums1)[r] for r in {0,1,2} can
        # work. Each candidate is validated by consuming a count of nums1
        # against every nums2 element minus x (the pool starts at |nums1|
        # and |nums2| = |nums1| - 2, so full consumption leaves exactly the
        # two removed elements). The smallest surviving candidate wins.
        sa = sorted(nums1)
        lo_b = min(nums2)
        best = None
        for r in range(3):
            x = lo_b - sa[r]
            pool = Counter(nums1)
            for v in nums2:
                if pool[v - x] == 0:
                    break
                pool[v - x] -= 1
            else:
                best = x if best is None else min(best, x)
        return best
