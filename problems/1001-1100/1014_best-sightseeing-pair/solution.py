from typing import List, Optional


class Solution:
    def maxScoreSightseeingPair(self, values: List[int]) -> int:
        best_prefix = values[0]  # max of values[i] + i seen so far
        best = float("-inf")
        for j in range(1, len(values)):
            score = best_prefix + values[j] - j
            if score > best:
                best = score
            if values[j] + j > best_prefix:
                best_prefix = values[j] + j
        return best
