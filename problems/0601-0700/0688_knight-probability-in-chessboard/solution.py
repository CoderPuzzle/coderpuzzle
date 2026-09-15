class Solution:
    def knightProbability(self, n: int, k: int, row: int, column: int) -> float:
        # Probability-mass DP over the board. board[r][c] is the probability
        # of standing on (r, c) after the moves made so far; one gather sweep
        # advances it by one move, and mass addressed off the board is lost.
        moves = [(-2, -1), (-2, 1), (-1, -2), (-1, 2), (1, -2), (1, 2), (2, -1), (2, 1)]
        board = [[0.0] * n for _ in range(n)]
        board[row][column] = 1.0
        for _ in range(k):
            nxt = [[0.0] * n for _ in range(n)]
            for r in range(n):
                for c in range(n):
                    mass = 0.0
                    for dr, dc in moves:
                        nr, nc = r + dr, c + dc
                        if 0 <= nr < n and 0 <= nc < n:
                            mass += board[nr][nc] / 8.0
                    nxt[r][c] = mass
            board = nxt
        total = 0.0
        for r in range(n):
            for c in range(n):
                total += board[r][c]
        return total
