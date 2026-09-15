from typing import List


class Solution:
    def maximumValueSum(self, board: List[List[int]]) -> int:
        # The three rooks occupy three distinct rows; pick the middle row i.
        # For each column, top[i][j] is the best cell in column j above row
        # i and bottom[i][j] the best below. A placement takes one column
        # from the top band, one from row i, one from the bottom band, all
        # distinct — and only each band's three best columns can matter, so
        # 27 combinations per middle row are exact.
        m, n = len(board), len(board[0])
        top = [[0] * n for _ in range(m)]
        bottom = [[0] * n for _ in range(m)]
        for j in range(n):
            top[0][j] = board[0][j]
            for i in range(1, m):
                top[i][j] = max(top[i - 1][j], board[i][j])
            bottom[m - 1][j] = board[m - 1][j]
            for i in range(m - 2, -1, -1):
                bottom[i][j] = max(bottom[i + 1][j], board[i][j])

        def top3(vals):
            return sorted((vals[c], c) for c in range(n))[-3:]

        ans = -(10**30)
        for i in range(1, m - 1):
            for va, ca in top3(top[i - 1]):
                for vb, cb in top3(board[i]):
                    if cb == ca:
                        continue
                    for vc, cc in top3(bottom[i + 1]):
                        if cc == ca or cc == cb:
                            continue
                        ans = max(ans, va + vb + vc)
        return ans
