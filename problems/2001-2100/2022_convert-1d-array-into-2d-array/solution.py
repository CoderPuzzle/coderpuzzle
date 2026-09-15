from typing import List


class Solution:
    def construct2DArray(self, original: List[int], m: int, n: int) -> List[List[int]]:
        if m * n != len(original):
            return []

        result = [[0] * n for _ in range(m)]
        for row in range(m):
            for column in range(n):
                result[row][column] = original[row * n + column]
        return result
