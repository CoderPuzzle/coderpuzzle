from typing import List


class Solution:
    def findMinDifference(self, timePoints: List[str]) -> int:
        # Only 24*60 distinct minute marks exist, so convert each "HH:MM"
        # once and sort: the closest pair must be adjacent in sorted order.
        minutes = sorted(int(t[:2]) * 60 + int(t[3:]) for t in timePoints)
        # The clock wraps, so the first and last marks are also a pair —
        # the one that spans midnight; its gap is first + 1440 - last.
        best = minutes[0] + 24 * 60 - minutes[-1]
        for prev, curr in zip(minutes, minutes[1:]):
            best = min(best, curr - prev)
        return best
