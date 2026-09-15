from typing import List


class Solution:
    def findBall(self, grid: List[List[int]]) -> List[int]:
        # Each column's ball walks alone: the board d under it deflects it
        # into the gap between columns c and c + d, and it drops through
        # only if the board on the far side of that gap points the same
        # way — a facing pair forms a V that closes the gap, a missing
        # neighbour means the gap opens into a wall, and both mean stuck.
        m, n = len(grid), len(grid[0])
        answer: List[int] = []
        for ball in range(n):
            c = ball
            for r in range(m):
                d = grid[r][c]
                nxt = c + d
                if nxt < 0 or nxt >= n or grid[r][nxt] != d:
                    c = -1
                    break
                c = nxt
            answer.append(c)
        return answer
