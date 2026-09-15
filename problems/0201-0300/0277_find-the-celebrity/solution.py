from typing import List, Optional


class Solution:
    def findCelebrity(self, graph: List[List[int]]) -> int:
        n = len(graph)
        # Elimination pass: a candidate that knows nobody else.
        candidate = 0
        for i in range(1, n):
            if graph[candidate][i] == 1:
                candidate = i
        # Verification pass.
        for i in range(n):
            if i == candidate:
                continue
            if graph[candidate][i] == 1:
                return -1  # candidate knows someone
            if graph[i][candidate] == 0:
                return -1  # someone does not know the candidate
        return candidate
