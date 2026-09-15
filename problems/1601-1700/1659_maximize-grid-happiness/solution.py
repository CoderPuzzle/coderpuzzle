from typing import List, Optional


class Solution:
    def getMaxGridHappiness(self, m: int, n: int, introvertsCount: int, extrovertsCount: int) -> int:
        # Fill the grid cell by cell, row-major, and charge every bond when
        # its second member is placed: a newcomer of type v pays its own
        # base (120 for an introvert, 40 for an extrovert) plus, for each
        # of the two neighbours possibly already placed (left, above), both
        # sides of that bond at once — -60 for two introverts, +40 for two
        # extroverts, -10 for a mixed pair. The future only needs the
        # occupancy of the last n filled cells, held as one ternary mask
        # whose trit 0 is the left neighbour and trit n-1 the neighbour
        # above, plus the two budgets left. Every state value stays
        # non-negative (an introvert surrounded on all four sides still
        # nets 0), so -1 cleanly marks unreachable states.
        width = 3**n
        span = width // 3
        pair = ((0, 0, 0), (0, -60, -10), (0, -10, 40))
        dp = [[[-1] * 7 for _ in range(7)] for _ in range(width)]
        dp[0][introvertsCount][extrovertsCount] = 0
        for cell in range(m * n):
            has_left = cell % n != 0
            has_up = cell >= n
            nxt = [[[-1] * 7 for _ in range(7)] for _ in range(width)]
            for mask in range(width):
                left = mask % 3 if has_left else 0
                up = mask // span % 3 if has_up else 0
                shifted = mask % span * 3
                for i in range(7):
                    row = dp[mask][i]
                    for e in range(7):
                        best = row[e]
                        if best < 0:
                            continue
                        for v, base in ((0, 0), (1, 120), (2, 40)):
                            if v == 1 and i == 0:
                                continue
                            if v == 2 and e == 0:
                                continue
                            gain = base
                            if left:
                                gain += pair[v][left]
                            if up:
                                gain += pair[v][up]
                            state = nxt[shifted + v][i - (v == 1)][e - (v == 2)]
                            if best + gain > state:
                                nxt[shifted + v][i - (v == 1)][e - (v == 2)] = best + gain
            dp = nxt
        return max(value for table in dp for row in table for value in row)
