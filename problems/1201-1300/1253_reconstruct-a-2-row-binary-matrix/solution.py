from typing import List


class Solution:
    def reconstructMatrix(self, upper: int, lower: int, colsum: List[int]) -> List[List[int]]:
        n = len(colsum)
        twos = colsum.count(2)
        ones = colsum.count(1)
        # Every 2 spends one from each row; the top row cannot exceed its cap.
        if 2 * twos + ones != upper + lower or not twos <= upper <= twos + ones:
            return []
        # First (upper - twos) free columns go on top; nothing else is chosen.
        free_top = upper - twos
        top = [0] * n
        bottom = [0] * n
        for i, s in enumerate(colsum):
            if s == 2:
                top[i] = bottom[i] = 1
            elif s == 1:
                if free_top > 0:
                    top[i] = 1
                    free_top -= 1
                else:
                    bottom[i] = 1
        return [top, bottom]
