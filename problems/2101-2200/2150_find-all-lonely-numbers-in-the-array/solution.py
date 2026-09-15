from collections import Counter
from typing import List, Optional


class Solution:
    def findLonely(self, nums: List[int]) -> List[int]:
        # A lonely value appears exactly once and has neither neighbour
        # x - 1 nor x + 1 present; scanning nums in order keeps the
        # output in first-occurrence order.
        count = Counter(nums)
        return [x for x in nums if count[x] == 1 and x - 1 not in count and x + 1 not in count]
