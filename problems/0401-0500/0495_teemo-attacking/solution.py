from typing import List


class Solution:
    def findPoisonedDuration(self, timeSeries: List[int], duration: int) -> int:
        # Every attack opens a poison window of `duration` seconds, but a
        # fresh attack inside the still-open window resets the timer, so
        # attack i keeps only the part of its window that runs out before the
        # next attack: min(duration, gap). The final attack is never followed
        # by another, so it always contributes its full duration.
        total = 0
        for i in range(1, len(timeSeries)):
            total += min(duration, timeSeries[i] - timeSeries[i - 1])
        return total + duration
