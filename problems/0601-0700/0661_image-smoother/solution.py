from typing import List


class Solution:
    def imageSmoother(self, img: List[List[int]]) -> List[List[int]]:
        # Each output cell averages the 3x3 window around it, clamped to the
        # matrix, so border cells average fewer than nine values; writing
        # into a fresh matrix keeps every window reading unsmoothed input.
        m, n = len(img), len(img[0])
        smoothed: List[List[int]] = [[0] * n for _ in range(m)]
        # The window rows run from max(i-1, 0) to min(i+2, m) and the columns
        # likewise; summing in integers and floor-dividing by the count is
        # the rounding-down average (values are non-negative, so // floors).
        for i in range(m):
            for j in range(n):
                total = 0
                count = 0
                for r in range(max(i - 1, 0), min(i + 2, m)):
                    for c in range(max(j - 1, 0), min(j + 2, n)):
                        total += img[r][c]
                        count += 1
                smoothed[i][j] = total // count
        return smoothed
