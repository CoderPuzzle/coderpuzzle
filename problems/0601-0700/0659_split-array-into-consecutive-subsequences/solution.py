from collections import Counter
from typing import List


class Solution:
    def isPossible(self, nums: List[int]) -> bool:
        # One walk over the sorted array with two counter maps: left[v] is
        # the copies of v not yet placed, need[v] the subsequences whose
        # next wanted value is v. Placing x always prefers extending an
        # existing subsequence over starting a new one.
        left = Counter(nums)
        need = Counter()
        for x in nums:
            if left[x] == 0:
                # consumed by a run started earlier as its x+1/x+2
                continue
            if need[x] > 0:
                # extend: the run that wanted x now wants x + 1
                left[x] -= 1
                need[x] -= 1
                need[x + 1] += 1
            elif left[x + 1] > 0 and left[x + 2] > 0:
                # start a run of three: it eats the next two values ahead
                # of the walk and then wants x + 3
                left[x] -= 1
                left[x + 1] -= 1
                left[x + 2] -= 1
                need[x + 3] += 1
            else:
                # x can neither extend a run nor seed a legal new one
                return False
        return True
