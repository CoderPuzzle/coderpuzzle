from typing import Dict, List, Tuple


class Solution:
    def ways(self, pizza: List[str], k: int) -> int:
        MOD = 10**9 + 7
        rows, cols = len(pizza), len(pizza[0])
        # apples[r][c] = apples in the rectangle (r, c)..(rows-1, cols-1).
        apples = [[0] * (cols + 1) for _ in range(rows + 1)]
        for r in range(rows - 1, -1, -1):
            for c in range(cols - 1, -1, -1):
                apples[r][c] = (
                    apples[r + 1][c] + apples[r][c + 1] - apples[r + 1][c + 1] + (1 if pizza[r][c] == "A" else 0)
                )

        memo: Dict[Tuple[int, int, int], int] = {}

        def count(r: int, c: int, remaining: int) -> int:
            if apples[r][c] == 0:
                return 0
            if remaining == 0:
                return 1
            key = (r, c, remaining)
            if key in memo:
                return memo[key]
            total = 0
            # Horizontal cuts: hand away rows r..i-1, keep (i, c).
            for i in range(r + 1, rows):
                if apples[r][c] - apples[i][c] > 0:
                    total += count(i, c, remaining - 1)
            # Vertical cuts: hand away columns c..j-1, keep (r, j).
            for j in range(c + 1, cols):
                if apples[r][c] - apples[r][j] > 0:
                    total += count(r, j, remaining - 1)
            memo[key] = total % MOD
            return memo[key]

        return count(0, 0, k - 1)
