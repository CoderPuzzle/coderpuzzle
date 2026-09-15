from typing import List


class Solution:
    def pathExistenceQueries(self, n: int, nums: List[int], maxDiff: int, queries: List[List[int]]) -> List[bool]:
        # nums is sorted, so any edge i-j (i < j) forces every consecutive
        # pair between them to be an edge too — components are contiguous
        # segments, cut wherever a gap exceeds maxDiff.
        comp = [0] * n
        for i in range(1, n):
            comp[i] = comp[i - 1] + (1 if nums[i] - nums[i - 1] > maxDiff else 0)
        return [comp[u] == comp[v] for u, v in queries]
