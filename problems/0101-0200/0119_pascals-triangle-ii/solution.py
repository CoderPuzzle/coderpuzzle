from typing import List


class Solution:
    def getRow(self, rowIndex: int) -> List[int]:
        # One array of edge 1s, folded forward row by row: after pass i its
        # first i + 1 cells hold row i exactly, so the returned array is the
        # only one ever allocated — the O(rowIndex) space the follow-up asks for.
        row = [1] * (rowIndex + 1)
        for length in range(2, rowIndex + 1):
            # Right-to-left: row[j - 1] still holds the previous row's value
            # when row[j] is updated, so row[j] += row[j - 1] is exactly the
            # sum-of-the-two-cells-directly-above recurrence — a left-to-right
            # scan would have already overwritten that left operand.
            for j in range(length - 1, 0, -1):
                row[j] += row[j - 1]
        return row
