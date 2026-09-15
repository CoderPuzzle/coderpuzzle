from typing import List, Optional


class Solution:
    def maxTotalFruits(self, fruits: List[List[int]], startPos: int, k: int) -> int:
        # An optimal walk turns at most once, so the harvest is always one
        # contiguous interval of the position-sorted fruit array. Prefix sums
        # give each interval's fruit total in O(1).
        positions = [f[0] for f in fruits]
        prefix = [0]
        for f in fruits:
            prefix.append(prefix[-1] + f[1])

        def window_cost(left_pos, right_pos):
            # Cheapest cost of covering the interval from startPos: straight
            # line when the start lies outside it; otherwise double the leg
            # walked first, taking the better direction to double.
            if startPos <= left_pos:
                return right_pos - startPos
            if startPos >= right_pos:
                return startPos - left_pos
            return min(
                2 * (startPos - left_pos) + (right_pos - startPos),
                2 * (right_pos - startPos) + (startPos - left_pos),
            )

        n = len(fruits)
        best = 0
        left = 0
        # Two-pointer sweep: shrink while the interval exceeds k, and re-check
        # affordability before counting (a lone unreachable fruit never
        # contributes). Both pointers only advance, so the sweep is linear.
        for right in range(n):
            while left < right and window_cost(positions[left], positions[right]) > k:
                left += 1
            if window_cost(positions[left], positions[right]) <= k:
                best = max(best, prefix[right + 1] - prefix[left])
        return best
