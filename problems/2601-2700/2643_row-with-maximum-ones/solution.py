from typing import List


class Solution:
    def rowAndMaximumOnes(self, mat: List[List[int]]) -> List[int]:
        # One scan carries the best (count, row) pair seen so far; only a
        # strictly greater count replaces the incumbent, so among tied rows
        # the smallest index automatically survives.
        best_row = 0
        best_count = -1
        for row_index, row in enumerate(mat):
            count = 0
            for value in row:
                if value == 1:
                    count += 1
            if count > best_count:
                best_count = count
                best_row = row_index
        return [best_row, best_count]
