from typing import List, Optional


class Solution:
    def minSwaps(self, grid: List[List[int]]) -> int:
        n = len(grid)

        def trailing_zeros(row: List[int]) -> int:
            count = 0
            for value in reversed(row):
                if value != 0:
                    break
                count += 1
            return count

        zeros = [trailing_zeros(row) for row in grid]
        swaps = 0
        for i in range(n):
            needed = n - i - 1
            if zeros[i] >= needed:
                continue
            j = i + 1
            while j < n and zeros[j] < needed:
                j += 1
            if j == n:
                return -1
            while j > i:
                zeros[j], zeros[j - 1] = zeros[j - 1], zeros[j]
                j -= 1
                swaps += 1
        return swaps
