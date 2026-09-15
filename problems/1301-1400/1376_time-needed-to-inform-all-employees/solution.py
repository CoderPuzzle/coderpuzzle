from typing import List


class Solution:
    def numOfMinutes(self, n: int, headID: int, manager: List[int], informTime: List[int]) -> int:
        # arrival[i] = minutes until employee i starts spreading the news.
        arrival = [-1] * n
        arrival[headID] = 0

        def resolve(start: int) -> int:
            if arrival[start] >= 0:
                return arrival[start]
            # Walk up the chain of unresolved managers, then unwind downward.
            # Each employee's start time is its manager's start time plus the
            # manager's own inform time, so the unwinding carries the parent
            # alongside the child.
            chain = []
            current = start
            while arrival[current] < 0:
                chain.append(current)
                current = manager[current]
            for employee in reversed(chain):
                arrival[employee] = arrival[manager[employee]] + informTime[manager[employee]]
            return arrival[start]

        best = 0
        for employee in range(n):
            best = max(best, resolve(employee))
        return best
