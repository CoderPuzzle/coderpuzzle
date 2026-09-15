from typing import List


class TicTacToe:
    """One counter per line: rows/cols carry each player's mark count on
    every line, plus one counter per diagonal. `move` bumps the counters
    running through the played square — one of them reaching n means the
    player owns the whole line.
    """

    def __init__(self, n: int) -> None:
        # Index 0 stays unused so the player ids 1 and 2 address their
        # own counter rows directly.
        self.rows: List[List[int]] = [[0] * n for _ in range(3)]
        self.cols: List[List[int]] = [[0] * n for _ in range(3)]
        self.diagonal: List[int] = [0] * 3
        self.anti_diagonal: List[int] = [0] * 3
        self.n = n

    def move(self, row: int, col: int, player: int) -> int:
        # Only the lines through the played square can complete on this
        # move, so the counters just bumped decide the winner.
        self.rows[player][row] += 1
        self.cols[player][col] += 1
        if row == col:
            self.diagonal[player] += 1
        if row + col == self.n - 1:
            self.anti_diagonal[player] += 1
        if (
            self.rows[player][row] == self.n
            or self.cols[player][col] == self.n
            or self.diagonal[player] == self.n
            or self.anti_diagonal[player] == self.n
        ):
            return player
        return 0
