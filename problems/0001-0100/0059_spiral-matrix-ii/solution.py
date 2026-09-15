from typing import List


class Solution:
    def generateMatrix(self, n: int) -> List[List[int]]:
        # Boundary-shrinking walk: fill the ring of the matrix that is left —
        # top row, right column, bottom row, left column — with the next run of
        # consecutive values, then shrink every boundary inward by one and
        # repeat until every cell is written.
        matrix: List[List[int]] = [[0] * n for _ in range(n)]
        top, bottom, left, right = 0, n - 1, 0, n - 1
        value = 1
        while value <= n * n:
            for column in range(left, right + 1):
                matrix[top][column] = value
                value += 1
            for row in range(top + 1, bottom + 1):
                matrix[row][right] = value
                value += 1
            if top != bottom:
                # Leftwards along the bottom row, stopping before the corner
                # the right-column run already filled.
                for column in range(right - 1, left - 1, -1):
                    matrix[bottom][column] = value
                    value += 1
            if left != right:
                # Upwards along the left column, stopping before the corner
                # the top-row run already filled.
                for row in range(bottom - 1, top, -1):
                    matrix[row][left] = value
                    value += 1
            top += 1
            bottom -= 1
            left += 1
            right -= 1
        return matrix
