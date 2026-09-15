from typing import List


class Solution:
    def filterOccupiedIntervals(
        self, occupiedIntervals: List[List[int]], freeStart: int, freeEnd: int
    ) -> List[List[int]]:
        merged = []
        for start, end in sorted(occupiedIntervals):
            if merged and start <= merged[-1][1] + 1:
                merged[-1][1] = max(merged[-1][1], end)
            else:
                merged.append([start, end])

        answer = []
        for start, end in merged:
            if freeEnd < start or freeStart > end:
                answer.append([start, end])
                continue
            if freeStart > start:
                answer.append([start, freeStart - 1])
            if freeEnd < end:
                answer.append([freeEnd + 1, end])
        return answer
