from typing import List


class Solution:
    def distributeCandies(self, n: int, limit: int) -> int:
        # Inclusion-exclusion over the three per-child caps: without caps
        # the splits of n among 3 children number C(n + 2, 2); forcing a
        # child over its cap is counted by C(n - (limit+1) + 2, 2), and
        # the alternating sum repairs double- and triple-forced overlaps.
        def capped_ways(candies: int) -> int:
            # Splits of `candies` among 3 uncapped children.
            return candies * (candies - 1) // 2 if candies >= 2 else 0

        return (
            capped_ways(n + 2)
            - 3 * capped_ways(n - (limit + 1) + 2)
            + 3 * capped_ways(n - 2 * (limit + 1) + 2)
            - capped_ways(n - 3 * (limit + 1) + 2)
        )
