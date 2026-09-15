class Solution:
    def leftMostColumnWithOne(self, matrix: BinaryMatrix) -> int:
        rows, cols = matrix.dimensions()
        # Per-row binary search for the first 1: a 1 at mid is the best
        # sighting in this row so far (keep searching left of it), a 0 at
        # mid means the row switches strictly right of mid (skip mid and
        # everything left of it); the answer is the minimum over rows.
        answer = -1
        for row in range(rows):
            lo, hi = 0, cols - 1
            first = -1
            while lo <= hi:
                mid = (lo + hi) // 2
                if matrix.get(row, mid) == 1:
                    first = mid
                    hi = mid - 1
                else:
                    lo = mid + 1
            if first != -1 and (answer == -1 or first < answer):
                answer = first
        return answer
