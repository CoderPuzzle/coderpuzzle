from collections import Counter
from typing import List


class Solution:
    def findLHS(self, nums: List[int]) -> int:
        # Deletion freedom reduces the subsequence to its value multiset: only
        # how often each value occurs matters, never the order. The exactly-1
        # gap forces a harmonious pick onto the two values v and v + 1, and a
        # count-map key occurs at least once, so looking up each key's
        # successor is exactly the both-values-present test; the largest
        # count(v) + count(v + 1) wins, 0 when no adjacent pair exists.
        counts = Counter(nums)
        best = 0
        for value, count in counts.items():
            if value + 1 in counts:
                best = max(best, count + counts[value + 1])
        return best
