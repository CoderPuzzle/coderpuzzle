from typing import List


class Solution:
    def maximumValueSum(self, board: List[List[int]]) -> int:
        m = len(board)
        # Per row, only the three most valuable cells can ever matter: a
        # rook of an optimal placement sitting outside its row's top three
        # swaps into one of them — the three candidate columns face at most
        # two blocked ones, so some column is free and the swap never
        # lowers the sum.
        tops = []
        for row in board:
            cells = sorted(((value, j) for j, value in enumerate(row)), reverse=True)[:3]
            tops.append(cells)

        # Row triples with one candidate each, pairwise-distinct columns.
        # Candidates are value-sorted, so combos run in decreasing
        # partial-sum order and a level is abandoned once even its best
        # completion — the other rows' top cells — cannot beat the answer.
        # Sums reach 3 * 10^9 in absolute value, past the 32-bit range.
        neg = float("-inf")
        ans = neg
        for i in range(m):
            ti = tops[i]
            for j in range(i + 1, m):
                tj = tops[j]
                j_top = tj[0][0]
                for k in range(j + 1, m):
                    tk = tops[k]
                    k_top = tk[0][0]
                    for va, ca in ti:
                        if va + j_top + k_top <= ans:
                            break
                        for vb, cb in tj:
                            if cb == ca:
                                continue
                            if va + vb + k_top <= ans:
                                break
                            for vc, cc in tk:
                                if cc == ca or cc == cb:
                                    continue
                                total = va + vb + vc
                                if total > ans:
                                    ans = total
                                break
        return int(ans)
