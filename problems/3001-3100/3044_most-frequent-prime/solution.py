from typing import List


class Solution:
    def mostFrequentPrime(self, mat: List[List[int]]) -> int:
        # From every cell, march each of the eight directions straight to the
        # matrix edge; a path is fully described by its start and direction.
        directions = ((0, 1), (1, 1), (1, 0), (1, -1), (0, -1), (-1, -1), (-1, 0), (-1, 1))
        counts = {}
        for i in range(len(mat)):
            for j in range(len(mat[0])):
                for di, dj in directions:
                    value = mat[i][j]
                    x, y = i + di, j + dj
                    while 0 <= x < len(mat) and 0 <= y < len(mat[0]):
                        # Appending one digit materializes the number formed
                        # at this step, so every step tallies on its own.
                        value = value * 10 + mat[x][y]
                        if value > 10 and self._is_prime(value):
                            counts[value] = counts.get(value, 0) + 1
                        x += di
                        y += dj
        # Highest frequency wins, ties toward the larger prime; no candidate
        # at all leaves the answer at -1.
        best_value, best_count = -1, 0
        for value, count in counts.items():
            if count > best_count or (count == best_count and value > best_value):
                best_value, best_count = value, count
        return best_value

    def _is_prime(self, value: int) -> bool:
        if value % 2 == 0:
            return value == 2
        factor = 3
        while factor * factor <= value:
            if value % factor == 0:
                return False
            factor += 2
        return True
