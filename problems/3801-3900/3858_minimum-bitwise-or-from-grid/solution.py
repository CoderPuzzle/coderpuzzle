from typing import List


class Solution:
    def minimumOR(self, grid: List[List[int]]) -> int:
        forbidden = 0
        answer = 0

        for bit in range(16, -1, -1):
            candidate = forbidden | (1 << bit)
            feasible = all(any((value & candidate) == 0 for value in row) for row in grid)
            if feasible:
                forbidden = candidate
            else:
                answer |= 1 << bit

        return answer
