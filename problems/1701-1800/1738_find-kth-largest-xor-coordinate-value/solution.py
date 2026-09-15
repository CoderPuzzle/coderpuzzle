from typing import List


class Solution:
    def kthLargestValue(self, matrix: List[List[int]], k: int) -> int:
        # A coordinate value is the XOR of the upper-left submatrix ending
        # there, and XOR cancels itself: prefix[a][b] = matrix[a][b]
        # ^ prefix[a-1][b] ^ prefix[a][b-1] ^ prefix[a-1][b-1]. Sweeping row
        # by row, the running XOR of the current row folded with the
        # previous prefix row yields the new row in O(n) space; collect all
        # m * n values, sort, and the kth largest sits k from the end.
        n = len(matrix[0])
        above = [0] * n
        values: List[int] = []
        for row in matrix:
            left = 0
            current = [0] * n
            for j in range(n):
                left ^= row[j]
                current[j] = left ^ above[j]
                values.append(current[j])
            above = current
        values.sort()
        return values[-k]
