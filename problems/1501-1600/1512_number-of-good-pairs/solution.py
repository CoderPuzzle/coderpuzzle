from typing import List, Optional


class Solution:
    def numIdenticalPairs(self, nums: List[int]) -> int:
        # For each value, the k-th time it is seen forms a good pair with
        # each of the k - 1 occurrences already counted, so adding the
        # running count before bumping it reproduces C(count, 2) per value.
        seen = {}
        total = 0
        for num in nums:
            total += seen.get(num, 0)
            seen[num] = seen.get(num, 0) + 1
        return total
