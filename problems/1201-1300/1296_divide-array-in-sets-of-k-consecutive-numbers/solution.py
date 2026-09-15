from typing import List, Optional
from collections import Counter


class Solution:
    def isPossibleDivide(self, nums: List[int], k: int) -> bool:
        # size-k sets can partition the array only if k divides n
        if len(nums) % k != 0:
            return False
        counts = Counter(nums)
        # walk distinct values smallest-first: the smallest remaining value
        # forces its run — every set containing it is exactly v..v+k-1
        for value in sorted(counts):
            need = counts[value]
            # already fully consumed by runs started below
            if need <= 0:
                continue
            # each of the need copies of value starts its own run; any of the
            # next k values falling short means no valid division exists
            for i in range(value, value + k):
                if counts[i] < need:
                    return False
                counts[i] -= need
        return True
