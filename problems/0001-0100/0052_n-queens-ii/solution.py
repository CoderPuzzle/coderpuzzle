class Solution:
    def totalNQueens(self, n: int) -> int:
        # One queen per row means rows can never clash; only the column and
        # the two diagonal families of the candidate square need a check.
        columns = set()
        diagonals = set()
        anti_diagonals = set()

        def walk(row: int) -> int:
            # Every row has a queen: one complete, conflict-free placement.
            if row == n:
                return 1
            count = 0
            for column in range(n):
                # r - c is constant along a main diagonal, r + c along an
                # anti-diagonal, so set membership answers "attacked?" in O(1).
                diagonal = row - column
                anti_diagonal = row + column
                if column in columns or diagonal in diagonals or anti_diagonal in anti_diagonals:
                    continue
                columns.add(column)
                diagonals.add(diagonal)
                anti_diagonals.add(anti_diagonal)
                count += walk(row + 1)
                # Undo the marks so sibling branches start from the same board.
                columns.remove(column)
                diagonals.remove(diagonal)
                anti_diagonals.remove(anti_diagonal)
            return count

        return walk(0)
