from typing import List


class Solution:
    def minMoves(self, classroom: List[str], energy: int) -> int:
        # BFS over (cell, collected-litter mask, energy left), one layer per
        # move. best[r * n + c][mask] keeps the largest energy that state was
        # reached with; a new arrival is only worth keeping when it carries
        # strictly more energy, because anything a weaker arrival can finish,
        # a stronger one at the same or smaller depth finishes no later. An
        # 'R' cell restores the tank on arrival, and the search returns the
        # moment a move lands on the last uncollected litter.
        m, n = len(classroom), len(classroom[0])
        bits = [[-1] * n for _ in range(m)]
        sr = sc = 0
        litter = 0
        for r in range(m):
            for c, ch in enumerate(classroom[r]):
                if ch == "S":
                    sr, sc = r, c
                elif ch == "L":
                    bits[r][c] = litter
                    litter += 1
        full = (1 << litter) - 1
        if full == 0:
            return 0
        stride = full + 1
        best = [-1] * (m * n * stride)
        best[(sr * n + sc) * stride] = energy
        layer = [(sr, sc, 0, energy)]
        moves = 0
        while layer:
            moves += 1
            nxt = []
            for r, c, mask, e in layer:
                for nr, nc in ((r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1)):
                    if not (0 <= nr < m and 0 <= nc < n) or classroom[nr][nc] == "X":
                        continue
                    ch = classroom[nr][nc]
                    ne = energy if ch == "R" else e - 1
                    if ch != "R" and ne < 0:
                        continue  # an empty tank only allows staying on an 'R'
                    nmask = mask | (1 << bits[nr][nc]) if ch == "L" else mask
                    if nmask == full:
                        return moves
                    idx = (nr * n + nc) * stride + nmask
                    if ne > best[idx]:
                        best[idx] = ne
                        nxt.append((nr, nc, nmask, ne))
            layer = nxt
        return -1
