from typing import List


class Solution:
    def maxArea(self, mat: List[List[int]]) -> int:
        m, n = len(mat), len(mat[0])
        # prefix[i][j] = usable cells in mat[0..i)[0..j): any k-square's fill
        # is then four lookups, so "all ones" is an O(1) test.
        prefix = [[0] * (n + 1) for _ in range(m + 1)]
        for i in range(m):
            row, above, cur = mat[i], prefix[i], prefix[i + 1]
            for j in range(n):
                cur[j + 1] = cur[j] + above[j + 1] - above[j] + row[j]

        def has_disjoint_pair(k: int) -> bool:
            # A disjoint pair exists iff the valid corners span >= k rows or
            # >= k columns: extreme-row corners give disjoint row ranges, and
            # if both spans are < k every pair of squares intersects. The
            # same corner twice spans 0 < k, so it never counts as a pair.
            min_row = min_col = m + n
            max_row = max_col = -1
            kk = k * k
            for r in range(m - k + 1):
                top, bottom = prefix[r], prefix[r + k]
                for c in range(n - k + 1):
                    if bottom[c + k] - bottom[c] - top[c + k] + top[c] == kk:
                        if r < min_row:
                            min_row = r
                        if r > max_row:
                            max_row = r
                        if c < min_col:
                            min_col = c
                        if c > max_col:
                            max_col = c
            if max_row < 0:
                return False
            return max_row - min_row >= k or max_col - min_col >= k

        # Binary search the largest feasible side; area is side squared.
        lo, hi = 0, min(m, n)
        while lo < hi:
            mid = (lo + hi + 1) // 2
            if has_disjoint_pair(mid):
                lo = mid
            else:
                hi = mid - 1
        return lo * lo
