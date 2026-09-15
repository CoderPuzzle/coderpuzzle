from collections import Counter
from typing import List


class Solution:
    def findPairs(self, nums: List[int], k: int) -> int:
        # One count map carries both halves: its keys are the distinct
        # values, so v + k membership is O(1), and its frequencies are
        # exactly what k == 0 asks for. A pair is identified by its two
        # values, so repeats enter the same pair at most once.
        counts = Counter(nums)
        if k == 0:
            # A 0-diff pair needs two equal values at different indexes, so a
            # value contributes once when it occurs at least twice — further
            # copies add nothing.
            return sum(1 for frequency in counts.values() if frequency > 1)
        # k > 0: count each distinct value whose partner v + k is also
        # present; scanning only upward pairs every couple exactly once and
        # never matches a value with itself.
        return sum(1 for value in counts if value + k in counts)
