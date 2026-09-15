from typing import List


class Solution:
    def validTicTacToe(self, board: List[str]) -> bool:
        # Reachability folds into three facts about the final position. X
        # moves first and play strictly alternates, so the counts must
        # satisfy x == o or x == o + 1. The game stops at the first
        # completed line, so at most one player holds a winning row,
        # column, or diagonal — and the winner's decisive placement pins
        # the tally exactly: X's winning move leaves x == o + 1, O's
        # leaves x == o. A board passing all three gates was played; any
        # other board is unreachable.
        cells = "".join(board)
        x = cells.count("X")
        o = cells.count("O")
        if x != o and x != o + 1:
            return False

        lines = [
            (0, 1, 2),
            (3, 4, 5),
            (6, 7, 8),
            (0, 3, 6),
            (1, 4, 7),
            (2, 5, 8),
            (0, 4, 8),
            (2, 4, 6),
        ]

        def wins(player):
            return any(all(cells[i] == player for i in line) for line in lines)

        xwin = wins("X")
        owin = wins("O")
        if xwin and owin:
            return False
        if xwin and x != o + 1:
            return False
        if owin and x != o:
            return False
        return True
