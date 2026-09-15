from typing import List


class Solution:
    def tictactoe(self, moves: List[List[int]]) -> str:
        # Tally each player's occupancy per row and column as moves land,
        # diagonals directly (+1 for A, -1 for B); a tally reaching +-3 is
        # a completed line. In a valid transcript the game stops at the
        # first completed line, so the mover who completes one wins on the
        # spot and later moves cannot exist.
        rows = [0] * 3
        cols = [0] * 3
        diag = anti = 0
        for i, (r, c) in enumerate(moves):
            step = 1 if i % 2 == 0 else -1
            rows[r] += step
            cols[c] += step
            if r == c:
                diag += step
            if r + c == 2:
                anti += step
            if max(abs(rows[r]), abs(cols[c]), abs(diag), abs(anti)) == 3:
                return "A" if step == 1 else "B"
        return "Draw" if len(moves) == 9 else "Pending"
