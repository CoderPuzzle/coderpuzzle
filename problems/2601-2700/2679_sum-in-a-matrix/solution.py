from typing import List, Optional


class Solution:
    def matrixSum(self, nums: List[List[int]]) -> int:
        # Operation k removes the largest remaining number of every row, so
        # after each row is sorted in decreasing order the k-th column holds
        # exactly what that row gives up in operation k — the score is the
        # sum of the column maxima, with already-emptied rows skipped.
        for row in nums:
            row.sort(reverse=True)
        score = 0
        for column in range(max(len(row) for row in nums)):
            score += max(row[column] for row in nums if column < len(row))
        return score
