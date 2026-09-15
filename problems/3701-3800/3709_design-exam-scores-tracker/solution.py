from bisect import bisect_left, bisect_right
from typing import List


class ExamTracker:
    """Append-only timeline with running prefix totals.

    Chronological calls keep `times` sorted, so each `record` appends the
    time and the new running score total, and each `totalScore` binary-
    searches out the window `[startTime, endTime]` and subtracts two prefix
    totals. Python integers are unbounded, so accumulation never overflows.
    """

    def __init__(self) -> None:
        self.times: List[int] = []
        self.sums: List[int] = []

    def record(self, time: int, score: int) -> None:
        self.times.append(time)
        self.sums.append((self.sums[-1] if self.sums else 0) + score)

    def totalScore(self, startTime: int, endTime: int) -> int:
        left = bisect_left(self.times, startTime)
        right = bisect_right(self.times, endTime) - 1
        if left > right:
            return 0
        return self.sums[right] - (self.sums[left - 1] if left else 0)
