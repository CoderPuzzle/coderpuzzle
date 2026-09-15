from typing import List


class Solution:
    def findDegrees(self, matrix: List[List[int]]) -> List[int]:
        return [sum(row) for row in matrix]
