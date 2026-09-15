from typing import List


class Solution:
    def matrixSumQueries(self, n: int, queries: List[List[int]]) -> int:
        seen_rows = [False] * n
        seen_cols = [False] * n
        remaining_rows = remaining_cols = n
        total = 0
        for kind, index, value in reversed(queries):
            if kind == 0:
                if seen_rows[index]:
                    continue
                seen_rows[index] = True
                remaining_rows -= 1
                total += value * remaining_cols
            else:
                if seen_cols[index]:
                    continue
                seen_cols[index] = True
                remaining_cols -= 1
                total += value * remaining_rows
        return total
