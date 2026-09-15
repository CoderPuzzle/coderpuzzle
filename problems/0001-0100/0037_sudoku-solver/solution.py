from typing import List, Optional


class Solution:
    def solveSudoku(self, board: List[List[str]]) -> List[List[str]]:
        # One pass collects the empty cells and records the digits already
        # used in 27 bitmasks -- one per row, column, and 3x3 box -- with
        # digit d encoded as bit 1 << d.
        rows = [0] * 9
        cols = [0] * 9
        boxes = [0] * 9
        empties = []
        for r in range(9):
            for c in range(9):
                ch = board[r][c]
                if ch == ".":
                    empties.append((r, c))
                else:
                    bit = 1 << int(ch)
                    rows[r] |= bit
                    cols[c] |= bit
                    # Box index flattens the 3x3 block grid.
                    boxes[(r // 3) * 3 + c // 3] |= bit

        def backtrack(k):
            # Past the last empty cell: a complete consistent assignment.
            # True unwinds the whole stack immediately, so the solver stops
            # at the first solution (the puzzle is guaranteed unique).
            if k == len(empties):
                return True
            r, c = empties[k]
            b = (r // 3) * 3 + c // 3
            for d in range(1, 10):
                bit = 1 << d
                # Legality is three constant-time ANDs against the masks,
                # instead of re-scanning 27 cells.
                if rows[r] & bit or cols[c] & bit or boxes[b] & bit:
                    continue
                # Place d: set its three bits, write the cell, attack k + 1.
                rows[r] |= bit
                cols[c] |= bit
                boxes[b] |= bit
                board[r][c] = str(d)
                if backtrack(k + 1):
                    return True
                # Every choice downstream failed: undo the placement --
                # XOR clears each bit and the cell reverts to '.'.
                rows[r] ^= bit
                cols[c] ^= bit
                boxes[b] ^= bit
                board[r][c] = "."
            return False

        backtrack(0)
        return board
