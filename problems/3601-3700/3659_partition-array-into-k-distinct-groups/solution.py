from collections import Counter
from typing import List


class Solution:
    def partitionArray(self, nums: List[int], k: int) -> bool:
        # Whole groups of exactly k require n to divide evenly, and each
        # occurrence of a value consumes a group of its own, so no value may
        # occur more often than the number of groups.
        n = len(nums)
        if n % k != 0:
            return False
        return max(Counter(nums).values()) <= n // k
