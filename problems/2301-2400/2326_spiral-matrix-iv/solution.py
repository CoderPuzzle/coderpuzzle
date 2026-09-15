from typing import List, Optional


class Solution:
    def spiralMatrix(self, m: int, n: int, head: Optional[ListNode]) -> List[List[int]]:
        # The -1 fill doubles as the unvisited marker. A cursor advances along
        # the clockwise right/down/left/up cycle and rotates 90 degrees whenever
        # the candidate cell leaves the grid or was already written; it stops
        # when the list runs out, leaving every unwritten cell at -1.
        matrix = [[-1] * n for _ in range(m)]
        directions = ((0, 1), (1, 0), (0, -1), (-1, 0))
        row = column = direction = 0
        node = head
        while node is not None:
            matrix[row][column] = node.val
            node = node.next
            if node is None:
                break
            step_row, step_column = directions[direction]
            next_row, next_column = row + step_row, column + step_column
            if not (0 <= next_row < m and 0 <= next_column < n and matrix[next_row][next_column] == -1):
                direction = (direction + 1) % 4
                step_row, step_column = directions[direction]
                next_row, next_column = row + step_row, column + step_column
            row, column = next_row, next_column
        return matrix
