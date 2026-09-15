from typing import List


class Solution:
    def findLonelyPixel(self, picture: List[List[str]]) -> int:
        # A pixel is lonely exactly when it is the only 'B' in its row and
        # the only 'B' in its column. One pass tallies both totals per row
        # and per column; a second pass checks each 'B' against them.
        m = len(picture)
        n = len(picture[0])
        row_count = [0] * m
        col_count = [0] * n
        for i in range(m):
            for j in range(n):
                if picture[i][j] == "B":
                    row_count[i] += 1
                    col_count[j] += 1
        lonely = 0
        for i in range(m):
            for j in range(n):
                if picture[i][j] == "B" and row_count[i] == 1 and col_count[j] == 1:
                    lonely += 1
        return lonely
