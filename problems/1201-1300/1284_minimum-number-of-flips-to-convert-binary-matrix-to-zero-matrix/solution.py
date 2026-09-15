from typing import List


class Solution:
    def minFlips(self, mat: List[List[int]]) -> int:
        # Pack the matrix into one integer; flipping cell i XORs the state
        # with its cross-shaped flip mask. Order never matters and flipping
        # a cell twice cancels, so the reachable states form one graph per
        # start state and BFS over it gives the minimum step count.
        m, n = len(mat), len(mat[0])
        start = 0
        for r in range(m):
            for c in range(n):
                if mat[r][c]:
                    start |= 1 << (r * n + c)
        if start == 0:
            return 0
        masks = []
        for r in range(m):
            for c in range(n):
                mask = 1 << (r * n + c)
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < m and 0 <= nc < n:
                        mask |= 1 << (nr * n + nc)
                masks.append(mask)
        seen = [False] * (1 << (m * n))
        seen[start] = True
        frontier = [start]
        steps = 0
        while frontier:
            steps += 1
            nxt = []
            for state in frontier:
                for mask in masks:
                    nstate = state ^ mask
                    if nstate == 0:
                        return steps
                    if not seen[nstate]:
                        seen[nstate] = True
                        nxt.append(nstate)
            frontier = nxt
        return -1
