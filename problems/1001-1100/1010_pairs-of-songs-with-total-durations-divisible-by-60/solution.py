from typing import List, Optional


class Solution:
    def numPairsDivisibleBy60(self, time: List[int]) -> int:
        # songs bucketed by duration % 60: only the remainders decide
        # whether two durations sum to a multiple of 60
        counts = [0] * 60
        total = 0
        for duration in time:
            remainder = duration % 60
            # each pair is counted once, at its later member: match every
            # earlier song whose remainder completes r to 0 (mod 60); the
            # % 60 folds the self-complementary classes 0 and 30 in place
            total += counts[(60 - remainder) % 60]
            counts[remainder] += 1
        return total
