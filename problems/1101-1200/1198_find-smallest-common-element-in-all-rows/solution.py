from typing import List, Optional


class Solution:
    def smallestCommonElement(self, mat: List[List[int]]) -> int:
        tally = [0] * 10001
        for row in mat:
            for value in row:
                tally[value] += 1
        for value in range(1, 10001):
            if tally[value] == len(mat):
                # Strictly increasing rows never repeat a value, so only a
                # value present in every row can reach count m.
                return value
        return -1
