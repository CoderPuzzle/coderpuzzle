from typing import List, Optional


class Solution:
    def maxTrailingZeros(self, grid: List[List[int]]) -> int:
        m = len(grid)
        n = len(grid[0])

        count2 = [[0] * n for _ in range(m)]
        count5 = [[0] * n for _ in range(m)]
        for i in range(m):
            for j in range(n):
                x = grid[i][j]
                c2 = 0
                while x % 2 == 0:
                    x //= 2
                    c2 += 1
                c5 = 0
                while x % 5 == 0:
                    x //= 5
                    c5 += 1
                count2[i][j] = c2
                count5[i][j] = c5

        # row2[i][j+1] = sum count2[i][0..j]; row5 analogous.
        row2 = [[0] * (n + 1) for _ in range(m)]
        row5 = [[0] * (n + 1) for _ in range(m)]
        for i in range(m):
            for j in range(n):
                row2[i][j + 1] = row2[i][j] + count2[i][j]
                row5[i][j + 1] = row5[i][j] + count5[i][j]

        # col2[j][i+1] = sum count2[0..i][j]; col5 analogous.
        col2 = [[0] * (m + 1) for _ in range(n)]
        col5 = [[0] * (m + 1) for _ in range(n)]
        for j in range(n):
            for i in range(m):
                col2[j][i + 1] = col2[j][i] + count2[i][j]
                col5[j][i + 1] = col5[j][i] + count5[i][j]

        def score(r, c):
            cell2 = count2[r][c]
            cell5 = count5[r][c]
            # horizontal sum over full row segment, vertical over full column segment
            horiz2_left = row2[r][c + 1]  # cols [0, c]
            horiz2_right = row2[r][n] - row2[r][c]  # cols [c, n-1]
            vert2_top = col2[c][r + 1]  # rows [0, r]
            vert2_bottom = col2[c][m] - col2[c][r]  # rows [r, m-1]
            horiz5_left = row5[r][c + 1]
            horiz5_right = row5[r][n] - row5[r][c]
            vert5_top = col5[c][r + 1]
            vert5_bottom = col5[c][m] - col5[c][r]

            candidates = (
                min(horiz2_left + vert2_top - cell2, horiz5_left + vert5_top - cell5),
                min(horiz2_right + vert2_top - cell2, horiz5_right + vert5_top - cell5),
                min(
                    horiz2_left + vert2_bottom - cell2,
                    horiz5_left + vert5_bottom - cell5,
                ),
                min(
                    horiz2_right + vert2_bottom - cell2,
                    horiz5_right + vert5_bottom - cell5,
                ),
            )
            return max(candidates)

        answer = 0
        for i in range(m):
            for j in range(n):
                answer = max(answer, score(i, j))
        return answer
