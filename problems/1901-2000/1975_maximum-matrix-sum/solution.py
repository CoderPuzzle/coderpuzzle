from typing import List


class Solution:
    def maxMatrixSum(self, matrix: List[List[int]]) -> int:
        # Each operation flips two border-adjacent cells, so the parity of the
        # negative count is invariant: an even count makes every value positive,
        # an odd count must leave the smallest-magnitude value negative.
        total = 0
        negatives = 0
        smallest = 10**5
        for row in matrix:
            for value in row:
                total += abs(value)
                if value < 0:
                    negatives += 1
                smallest = min(smallest, abs(value))
        if negatives % 2:
            total -= 2 * smallest
        return total
