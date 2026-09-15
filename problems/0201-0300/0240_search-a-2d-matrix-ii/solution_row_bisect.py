from typing import List, Optional


class Solution:
    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:
        if not matrix or not matrix[0]:
            return False
        cols = len(matrix[0])
        for row in matrix:
            # Columns are sorted, so once a row's first element already
            # exceeds the target, every later row starts even larger and
            # the target cannot exist below — stop scanning entirely.
            if row[0] > target:
                break
            # Each row is sorted, so binary-search it in O(log n).
            lo, hi = 0, cols - 1
            while lo < hi:
                mid = (lo + hi) // 2
                if row[mid] < target:
                    lo = mid + 1
                else:
                    hi = mid
            # lo lands on the leftmost element >= target; equality means
            # the target is present in this row.
            if row[lo] == target:
                return True
        # m rows each searched in O(log n): O(m log n), versus the
        # staircase's O(m + n).
        return False
