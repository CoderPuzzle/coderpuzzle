class Solution:
    def findPeakGrid(self, mat: list[list[int]]) -> list[int]:
        m, n = len(mat), len(mat[0])
        lo, hi = 0, m - 1
        while lo <= hi:
            mid = (lo + hi) // 2
            row = mat[mid]
            # Row maximum: already beats its left/right neighbors, so only the
            # vertical direction can disqualify it.
            j = 0
            for c in range(1, n):
                if row[c] > row[j]:
                    j = c
            # -1 perimeter outside the grid stands in for out-of-range neighbors.
            up = mat[mid - 1][j] if mid > 0 else -1
            down = mat[mid + 1][j] if mid < m - 1 else -1
            if row[j] > up and row[j] > down:
                return [mid, j]
            # Recurse toward the strictly larger vertical neighbor: the maximum of
            # that half is a peak of the whole matrix (the row just left behind is
            # entirely smaller), so the answer cannot be lost.
            if up > row[j]:
                hi = mid - 1
            else:
                lo = mid + 1
        return []
