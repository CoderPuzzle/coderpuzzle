from itertools import accumulate
from typing import List


class Solution:
    def resultGrid(self, image: List[List[int]], threshold: int) -> List[List[int]]:
        m, n = len(image), len(image[0])
        # A window is a region exactly when all twelve edge-adjacent pairs
        # inside it stay within threshold. Fold those pair tests once:
        # calm_h[r][c] means row r is horizontally calm across columns
        # c..c+2, calm_v[r][c] means column c is vertically calm across rows
        # r..r+2, so a window at (i, j) needs three entries of each kind.
        edge_h = [[abs(a - b) <= threshold for a, b in zip(row, row[1:])] for row in image]
        calm_h = [[a and b for a, b in zip(erow, erow[1:])] for erow in edge_h]
        edge_v = [[abs(a - b) <= threshold for a, b in zip(top, bot)] for top, bot in zip(image, image[1:])]
        calm_v = [[a and b for a, b in zip(e_top, e_bot)] for e_top, e_bot in zip(edge_v, edge_v[1:])]
        # Two-dimensional prefix sums give each window's nine-cell total in
        # constant time: pref[i + 3][j + 3] - pref[i][j + 3] is the sum of
        # rows i..i+2 up to column j + 2, minus the same for rows < i.
        pref = [[0] * (n + 1)]
        for row in image:
            above = pref[-1]
            pref.append([0] + [a + p for a, p in zip(accumulate(row), above[1:])])
        sums = [[0] * n for _ in range(m)]
        counts = [[0] * n for _ in range(m)]
        for i in range(m - 2):
            h_top, h_mid, h_bot = calm_h[i], calm_h[i + 1], calm_h[i + 2]
            v_mid = calm_v[i]
            low, high = pref[i + 3], pref[i]
            sr0, sr1, sr2 = sums[i], sums[i + 1], sums[i + 2]
            cr0, cr1, cr2 = counts[i], counts[i + 1], counts[i + 2]
            for j, ok in enumerate(h_top):
                if not (ok and h_mid[j] and h_bot[j] and v_mid[j] and v_mid[j + 1] and v_mid[j + 2]):
                    continue
                avg = (low[j + 3] - low[j] - high[j + 3] + high[j]) // 9
                # Credit the floored region average to all nine covered pixels.
                sr0[j] += avg
                sr0[j + 1] += avg
                sr0[j + 2] += avg
                sr1[j] += avg
                sr1[j + 1] += avg
                sr1[j + 2] += avg
                sr2[j] += avg
                sr2[j + 1] += avg
                sr2[j + 2] += avg
                cr0[j] += 1
                cr0[j + 1] += 1
                cr0[j + 2] += 1
                cr1[j] += 1
                cr1[j + 1] += 1
                cr1[j + 2] += 1
                cr2[j] += 1
                cr2[j + 1] += 1
                cr2[j + 2] += 1
        return [
            [total // count if count else original for total, count, original in zip(srow, crow, irow)]
            for srow, crow, irow in zip(sums, counts, image)
        ]
