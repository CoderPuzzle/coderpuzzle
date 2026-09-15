from typing import List, Optional


class Solution:
    def findCircleNum(self, isConnected: List[List[int]]) -> int:
        n = len(isConnected)
        visited = [False] * n
        provinces = 0
        for start in range(n):
            if visited[start]:
                continue
            # An unvisited city during the sweep starts a new component;
            # this one traversal absorbs exactly one province.
            provinces += 1
            visited[start] = True
            stack = [start]
            while stack:
                city = stack.pop()
                for other in range(n):
                    if isConnected[city][other] == 1 and not visited[other]:
                        # Mark at push time so no city is stacked twice;
                        # membership is by visitation, so self-loops and the
                        # symmetric matrix never double count.
                        visited[other] = True
                        stack.append(other)
        return provinces
