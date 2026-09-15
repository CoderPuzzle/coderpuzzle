class Solution:
    def alphabetBoardPath(self, target: str) -> str:
        out = []
        row = col = 0
        for ch in target:
            index = ord(ch) - ord("a")
            # U then L then D then R: horizontal runs never happen inside
            # the truncated row 5, because L precedes the descent to 'z'
            # and U climbs away from 'z' before any R.
            nrow, ncol = divmod(index, 5)
            out.append("U" * (row - nrow if row > nrow else 0))
            out.append("L" * (col - ncol if col > ncol else 0))
            out.append("D" * (nrow - row if nrow > row else 0))
            out.append("R" * (ncol - col if ncol > col else 0))
            out.append("!")
            row, col = nrow, ncol
        return "".join(out)
