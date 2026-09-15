from typing import List


class Solution:
    def earliestTime(self, tasks: List[List[int]]) -> int:
        # Tasks never interact: [s, t] finishes at s + t, so the earliest
        # completion is just the smallest such sum.
        best = tasks[0][0] + tasks[0][1]
        for s, t in tasks[1:]:
            if s + t < best:
                best = s + t
        return best
