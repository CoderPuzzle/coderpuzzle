from typing import List


class Solution:
    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        # Boundary-shrinking walk: emit the ring of the matrix that is left —
        # top row, right column, bottom row, left column — then shrink every
        # boundary inward by one and repeat until every element is emitted.
        rows, columns = len(matrix), len(matrix[0])
        top, bottom, left, right = 0, rows - 1, 0, columns - 1
        order: List[int] = []
        while len(order) < rows * columns:
            for column in range(left, right + 1):
                order.append(matrix[top][column])
            for row in range(top + 1, bottom + 1):
                order.append(matrix[row][right])
            if top != bottom:
                # Leftwards along the bottom row, stopping before the corner
                # the right-column run already emitted.
                for column in range(right - 1, left - 1, -1):
                    order.append(matrix[bottom][column])
            if left != right:
                # Upwards along the left column, stopping before the corner
                # the top-row run already emitted.
                for row in range(bottom - 1, top, -1):
                    order.append(matrix[row][left])
            top += 1
            bottom -= 1
            left += 1
            right -= 1
        return order
