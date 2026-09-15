class Solution:
    def lenOfVDiagonal(self, grid: List[List[int]]) -> int:
        n, m = len(grid), len(grid[0])
        # Diagonal directions in clockwise order NW, NE, SE, SW: a clockwise
        # 90-degree turn maps index d to (d + 1) % 4. Past the head '1' the
        # values alternate 2, 0, 2, 0, ..., so the other expected value of
        # e in {0, 2} is 2 - e.
        dirs = ((-1, -1), (-1, 1), (1, 1), (1, -1))
        # Straight tables: S2[d] / S0[d] hold, per cell, the longest run
        # starting there and going straight in direction d when the cell
        # must be a 2 / a 0 (0 when it is not). Rows sweep against the
        # direction so the next row is already computed; each row is built
        # with one comprehension for speed at the 500 x 500 limit.
        S2 = [None] * 4
        S0 = [None] * 4
        for d, (dr, dc) in enumerate(dirs):
            rows = range(n) if dr < 0 else range(n - 1, -1, -1)
            prev2 = [0] * m
            prev0 = [0] * m
            tab2 = [None] * n
            tab0 = [None] * n
            for r in rows:
                row = grid[r]
                if dc < 0:
                    nxt2 = [0] + prev2[:-1]  # table value at (r + dr, c + dc)
                    nxt0 = [0] + prev0[:-1]
                else:
                    nxt2 = prev2[1:] + [0]
                    nxt0 = prev0[1:] + [0]
                cur2 = [1 + t if g == 2 else 0 for g, t in zip(row, nxt0)]
                cur0 = [1 + t if g == 0 else 0 for g, t in zip(row, nxt2)]
                tab2[r] = cur2
                tab0[r] = cur0
                prev2, prev0 = cur2, cur0
            S2[d] = tab2
            S0[d] = tab0
        # One-turn tables: continue straight in direction d, or make the
        # single clockwise turn and hand over to the straight tables of
        # direction (d + 1) % 4.
        M2 = [None] * 4
        M0 = [None] * 4
        for d, (dr, dc) in enumerate(dirs):
            cw = (d + 1) % 4
            cdr, cdc = dirs[cw]
            rows = range(n) if dr < 0 else range(n - 1, -1, -1)
            m2_rows = [None] * n
            m0_rows = [None] * n
            prev2 = [0] * m
            prev0 = [0] * m
            cw0 = S0[cw]
            cw2 = S2[cw]
            for r in rows:
                row = grid[r]
                if dc < 0:
                    a2 = [0] + prev0[:-1]  # one-turn value at the straight next
                    a0 = [0] + prev2[:-1]
                else:
                    a2 = prev0[1:] + [0]
                    a0 = prev2[1:] + [0]
                cr = r + cdr
                if 0 <= cr < n:
                    c0 = cw0[cr]
                    c2 = cw2[cr]
                    if cdc < 0:
                        b2 = [0] + c0[:-1]  # straight value at the clockwise next
                        b0 = [0] + c2[:-1]
                    else:
                        b2 = c0[1:] + [0]
                        b0 = c2[1:] + [0]
                else:
                    b2 = [0] * m
                    b0 = [0] * m
                cur2 = [1 + (x if x > y else y) if g == 2 else 0 for g, x, y in zip(row, a2, b2)]
                cur0 = [1 + (x if x > y else y) if g == 0 else 0 for g, x, y in zip(row, a0, b0)]
                m2_rows[r] = cur2
                m0_rows[r] = cur0
                prev2, prev0 = cur2, cur0
            M2[d] = m2_rows
            M0[d] = m0_rows
        # A head '1' plus the best one-turn run over its four first steps.
        best = 0
        for r in range(n):
            row = grid[r]
            cand = [0] * m
            for d, (dr, dc) in enumerate(dirs):
                rr = r + dr
                if 0 <= rr < n:
                    t = M2[d][rr]
                    sh = ([0] + t[:-1]) if dc < 0 else (t[1:] + [0])
                    cand = [c if c >= s else s for c, s in zip(cand, sh)]
            for c, g in enumerate(row):
                if g == 1:
                    v = 1 + cand[c]
                    if v > best:
                        best = v
        return best
