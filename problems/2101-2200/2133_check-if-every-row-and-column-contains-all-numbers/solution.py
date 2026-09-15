from typing import List


class Solution:
    def checkValid(self, matrix: List[List[int]]) -> bool:
        size = len(matrix)
        for index in range(size):
            row_seen = [False] * (size + 1)
            col_seen = [False] * (size + 1)
            for offset in range(size):
                row_value = matrix[index][offset]
                col_value = matrix[offset][index]
                if row_seen[row_value] or col_seen[col_value]:
                    return False
                row_seen[row_value] = True
                col_seen[col_value] = True
        return True
