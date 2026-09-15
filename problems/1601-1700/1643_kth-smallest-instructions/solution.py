from typing import List, Optional


class Solution:
    def kthSmallestPath(self, destination: List[int], k: int) -> str:
        row, col = destination[0], destination[1]
        # binom[i][j] = C(i, j), built as Pascal's triangle up to i = row +
        # col so every count is available without computing a factorial;
        # row, col <= 15 keeps every entry well under 2**31.
        n = row + col
        binom = [[0] * (n + 1) for _ in range(n + 1)]
        for i in range(n + 1):
            binom[i][0] = 1
            binom[i][i] = 1
            for j in range(1, i):
                binom[i][j] = binom[i - 1][j - 1] + binom[i - 1][j]

        remaining_h, remaining_v = col, row
        path = []
        for _ in range(n):
            if remaining_h == 0:
                path.append("V")
                remaining_v -= 1
            elif remaining_v == 0:
                path.append("H")
                remaining_h -= 1
            else:
                # Completions starting with 'H': the remaining (remaining_h
                # - 1) H's and remaining_v V's fill the rest of the string
                # in any order, so this count is C(remaining_h - 1 +
                # remaining_v, remaining_v).
                count_if_h = binom[remaining_h - 1 + remaining_v][remaining_v]
                if k <= count_if_h:
                    path.append("H")
                    remaining_h -= 1
                else:
                    k -= count_if_h
                    path.append("V")
                    remaining_v -= 1
        return "".join(path)
