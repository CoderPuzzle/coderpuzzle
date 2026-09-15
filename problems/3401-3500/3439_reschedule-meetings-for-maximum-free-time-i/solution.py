from typing import List


class Solution:
    def maxFreeTime(self, eventTime: int, k: int, startTime: List[int], endTime: List[int]) -> int:
        # A meeting that stays put pins its position, so one continuous free
        # block can only stretch across gaps whose separating meetings are all
        # rescheduled — at most k of them, hence at most k + 1 consecutive
        # gaps. Compacting any k consecutive meetings against one edge of
        # their span realizes that window's gap sum as a single block.
        n = len(startTime)
        gaps = [startTime[0]] + [startTime[i] - endTime[i - 1] for i in range(1, n)]
        gaps.append(eventTime - endTime[-1])
        # Rolling sum of the k + 1 gaps around each group of k meetings.
        best = window = sum(gaps[: k + 1])
        for i in range(k + 1, n + 1):
            window += gaps[i] - gaps[i - k - 1]
            best = max(best, window)
        return best
