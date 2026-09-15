from typing import List


class Solution:
    def luckyNumbers(self, matrix: List[List[int]]) -> List[int]:
        row_min = [min(row) for row in matrix]
        col_max = [max(col) for col in zip(*matrix)]
        lucky = [
            value
            for r, row in enumerate(matrix)
            for c, value in enumerate(row)
            if value == row_min[r] and value == col_max[c]
        ]
        return sorted(lucky)
