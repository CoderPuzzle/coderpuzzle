from typing import List


class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        # Both guarantees together make row-major reading order one sorted
        # sequence, so a single bisection over the flattened index space
        # honors the O(log(m * n)) requirement.
        m, n = len(matrix), len(matrix[0])
        lo, hi = 0, m * n
        while lo < hi:
            mid = (lo + hi) // 2
            if matrix[mid // n][mid % n] < target:
                lo = mid + 1
            else:
                hi = mid
        # lo is the first flattened index holding a value >= target: the hit
        # itself when present, or the smallest value past it when absent.
        return lo < m * n and matrix[lo // n][lo % n] == target
