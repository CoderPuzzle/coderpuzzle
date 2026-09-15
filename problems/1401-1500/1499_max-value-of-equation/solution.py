from collections import deque
from typing import List, Optional


class Solution:
    def findMaxValueOfEquation(self, points: List[List[int]], k: int) -> int:
        # x is sorted increasing, so for i < j the equation value is
        # yj + xj + (yi - xi): the best partner maximizes the key y - x,
        # turning this into a sliding-window max over that key
        dq = deque()  # indices with y - x strictly decreasing
        best = -(10**18)
        for j, (xj, yj) in enumerate(points):
            # drop stale front: x only grows, so anything beyond k behind
            # the current j is beyond k for every later j too
            while dq and xj - points[dq[0]][0] > k:
                dq.popleft()
            if dq:
                i = dq[0]
                xi, yi = points[i]
                value = yj + yi + xj - xi
                if value > best:
                    best = value
            # a back entry with key <= newcomer's can never win a future j;
            # popping ties is safe — the newer index has larger x, so it
            # stays inside the k-window at least as long
            while dq and points[dq[-1]][1] - points[dq[-1]][0] <= yj - xj:
                dq.pop()
            dq.append(j)
        return best
