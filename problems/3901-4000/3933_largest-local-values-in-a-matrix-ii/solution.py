from typing import List


class Solution:
    def countLocalMaximums(self, matrix: List[List[int]]) -> int:
        rows, columns = len(matrix), len(matrix[0])
        positions = [[] for _ in range(201)]
        for row in range(rows):
            for column in range(columns):
                if matrix[row][column] != 0:
                    positions[matrix[row][column]].append((row, column))

        answer = 0
        for value in range(1, 201):
            if not positions[value]:
                continue
            prefix = [[0] * (columns + 1) for _ in range(rows + 1)]
            for row in range(rows):
                running = 0
                for column in range(columns):
                    running += int(matrix[row][column] > value)
                    prefix[row + 1][column + 1] = prefix[row][column + 1] + running

            for row, column in positions[value]:
                top = max(0, row - value)
                bottom = min(rows - 1, row + value)
                left = max(0, column - value)
                right = min(columns - 1, column + value)
                greater = (
                    prefix[bottom + 1][right + 1]
                    - prefix[top][right + 1]
                    - prefix[bottom + 1][left]
                    + prefix[top][left]
                )
                for corner_row in (row - value, row + value):
                    for corner_column in (column - value, column + value):
                        if (
                            0 <= corner_row < rows
                            and 0 <= corner_column < columns
                            and matrix[corner_row][corner_column] > value
                        ):
                            greater -= 1
                if greater == 0:
                    answer += 1
        return answer
