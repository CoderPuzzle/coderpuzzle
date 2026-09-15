from typing import List, Optional


class Solution:
    def solveNQueens(self, n: int) -> List[List[str]]:
        results = []
        cols = set()
        diag1 = set()
        diag2 = set()
        board = []

        # One queen per row removes row conflicts by construction, so only
        # columns and diagonals need tracking while the board grows row by row.
        def backtrack(row):
            # Every row holds a queen and no pair attacks: record a copy so
            # later backtracking cannot mutate this solution.
            if row == n:
                results.append(list(board))
                return
            for col in range(n):
                # O(1) safety check: cols holds occupied columns, diag1 holds
                # row - col (constant along one diagonal family), diag2 holds
                # row + col (constant along the other). A candidate is safe
                # exactly when all three values are unseen.
                if col in cols or (row - col) in diag1 or (row + col) in diag2:
                    continue
                cols.add(col)
                diag1.add(row - col)
                diag2.add(row + col)
                board.append("." * col + "Q" + "." * (n - col - 1))
                backtrack(row + 1)
                # Undo the placement, restoring state for the next candidate.
                board.pop()
                cols.remove(col)
                diag1.remove(row - col)
                diag2.remove(row + col)

        backtrack(0)
        return results
