from typing import List


class Solution:
    def pathsWithMaxScore(self, board: List[str]) -> List[int]:
        MOD = 1_000_000_007
        n = len(board)
        # score[i][j] is the best sum reachable at (i, j) from 'S', and
        # ways[i][j] counts the paths achieving it; -1 marks unreachable.
        score = [[-1] * n for _ in range(n)]
        ways = [[0] * n for _ in range(n)]
        score[n - 1][n - 1] = 0
        ways[n - 1][n - 1] = 1
        # Sweep bottom-up so every incoming cell (below, right, below-right)
        # is already resolved when a cell is visited. The start square is
        # seeded above and skipped here.
        for i in range(n - 1, -1, -1):
            for j in range(n - 1, -1, -1):
                if board[i][j] == "X" or (i == n - 1 and j == n - 1):
                    continue
                best = -1
                total = 0
                for di, dj in ((1, 0), (0, 1), (1, 1)):
                    ni, nj = i + di, j + dj
                    if ni >= n or nj >= n or score[ni][nj] < 0:
                        continue
                    if score[ni][nj] > best:
                        best = score[ni][nj]
                        total = ways[ni][nj]
                    elif score[ni][nj] == best:
                        total = (total + ways[ni][nj]) % MOD
                if best >= 0:
                    digit = ord(board[i][j]) - ord("0") if "1" <= board[i][j] <= "9" else 0
                    score[i][j] = best + digit
                    ways[i][j] = total % MOD
        if ways[0][0] == 0:
            return [0, 0]
        return [score[0][0], ways[0][0]]
