from typing import List


class Solution:
    def modifiedMatrix(self, matrix: List[List[int]]) -> List[List[int]]:
        # Each column holds at least one non-negative value, so the plain
        # column maximum is never the -1 sentinel itself and is exactly
        # what every -1 of that column should become.
        m, n = len(matrix), len(matrix[0])
        answer = [row[:] for row in matrix]
        for j in range(n):
            best = max(row[j] for row in matrix)
            for i in range(m):
                if answer[i][j] == -1:
                    answer[i][j] = best
        return answer
