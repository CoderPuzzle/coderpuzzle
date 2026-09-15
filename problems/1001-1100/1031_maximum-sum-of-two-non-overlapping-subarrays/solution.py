from typing import List


class Solution:
    def maxSumTwoNoOverlap(self, nums: List[int], firstLen: int, secondLen: int) -> int:
        n = len(nums)
        prefix = [0] * (n + 1)
        for i, value in enumerate(nums):
            prefix[i + 1] = prefix[i] + value

        def best(lead: int, trail: int) -> int:
            # Sweep every position where the trailing window could end,
            # tracking the best leading window that ends at or before the
            # trailing window's start (so the two never overlap, whether
            # they touch or leave a gap between them).
            max_lead = 0
            result = 0
            for end in range(lead + trail, n + 1):
                lead_sum = prefix[end - trail] - prefix[end - trail - lead]
                max_lead = max(max_lead, lead_sum)
                trail_sum = prefix[end] - prefix[end - trail]
                result = max(result, max_lead + trail_sum)
            return result

        # Try both relative orders: firstLen before secondLen, and
        # secondLen before firstLen. Skipping either one silently misses
        # inputs where the better placement runs the other way.
        return max(best(firstLen, secondLen), best(secondLen, firstLen))
