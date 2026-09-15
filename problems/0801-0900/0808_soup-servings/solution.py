from typing import List, Optional


class Solution:
    def soupServings(self, n: int) -> float:
        # Round up to whole servings of 25 mL each.
        m = (n + 24) // 25
        if m >= 179:  # n >= 4451: probability is within 1e-5 of 1
            return 1.0

        # prob[a][b] for a, b in 1..m; smaller (non-positive) arguments hit
        # the base cases below.
        table = [[0.0] * (m + 1) for _ in range(m + 1)]

        def value(a, b):
            if a <= 0 and b <= 0:
                return 0.5
            if a <= 0:
                return 1.0
            if b <= 0:
                return 0.0
            return table[a][b]

        for a in range(1, m + 1):
            for b in range(1, m + 1):
                table[a][b] = 0.25 * (value(a - 4, b) + value(a - 3, b - 1) + value(a - 2, b - 2) + value(a - 1, b - 3))

        return value(m, m)
