from typing import List


class Solution:
    def maxCollectedFruits(self, fruits: List[List[int]]) -> int:
        # Child 1 is pinned to the main diagonal. Children 2 and 3 each
        # walk their own off-diagonal triangle in n-1 steps (their row /
        # column advances one per move, and the diagonal can only be
        # touched by spending every later move on it, which collects
        # nothing), so solve them independently; diagonal cells and the
        # shared final cell are counted once, via the diagonal. Child 3
        # is child 2 with the grid transposed (swapped reads).
        n = len(fruits)
        total = sum(fruits[i][i] for i in range(n))

        def triangle(m: List[List[int]], swapped: bool) -> int:
            # Best walk from the top-right corner, one row per step,
            # staying strictly right of the diagonal, final cell
            # excluded (-1 marks not-yet-reachable cells; values >= 0).
            def cell(i: int, j: int) -> int:
                return m[j][i] if swapped else m[i][j]

            prev = [-1] * n
            prev[n - 1] = cell(0, n - 1)
            for i in range(1, n - 1):
                cur = [-1] * n
                for j in range(i + 1, n):
                    best = prev[j - 1]
                    if prev[j] > best:
                        best = prev[j]
                    if j + 1 < n and prev[j + 1] > best:
                        best = prev[j + 1]
                    if best >= 0:
                        cur[j] = best + cell(i, j)
                prev = cur
            return prev[n - 1]

        return total + triangle(fruits, False) + triangle(fruits, True)
