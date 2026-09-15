from typing import List, Optional


class Solution:
    def maxSumSubmatrix(self, matrix: List[List[int]], k: int) -> int:
        import bisect

        m = len(matrix)
        n = len(matrix[0])
        best = None
        for top in range(m):
            # col_sum[c] = sum of column c between rows top..bottom, so
            # extending the bottom row is one O(n) update; any rectangle
            # in this row pair is a contiguous subarray of col_sum.
            col_sum = [0] * n
            for bottom in range(top, m):
                for c in range(n):
                    col_sum[c] += matrix[bottom][c]
                prefix = 0
                # 0 seeded so a subarray starting at the first column counts.
                prefixes = [0]
                for value in col_sum:
                    prefix += value
                    # Subarray sum = prefix - earlier prefix; the smallest
                    # earlier >= prefix - k maximizes it while staying <= k.
                    position = bisect.bisect_left(prefixes, prefix - k)
                    if position < len(prefixes):
                        candidate = prefix - prefixes[position]
                        if best is None or candidate > best:
                            best = candidate
                    # Keep the list sorted for the next query.
                    bisect.insort(prefixes, prefix)
        return best
