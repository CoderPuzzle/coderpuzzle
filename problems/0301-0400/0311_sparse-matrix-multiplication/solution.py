from typing import List


class Solution:
    def multiply(self, mat1: List[List[int]], mat2: List[List[int]]) -> List[List[int]]:
        m, k, n = len(mat1), len(mat2), len(mat2[0])
        # For each row of mat2, the (column, value) pairs that are nonzero —
        # the only entries a nonzero mat1 cell can ever pair with.
        nonzero2 = [[] for _ in range(k)]
        for p in range(k):
            row = mat2[p]
            for j in range(n):
                if row[j] != 0:
                    nonzero2[p].append((j, row[j]))
        result = [[0] * n for _ in range(m)]
        for i in range(m):
            row = mat1[i]
            out = result[i]
            # A zero in mat1 wipes a whole row of products; skip it instead
            # of multiplying every mat2 entry by zero.
            for p in range(k):
                value = row[p]
                if value != 0:
                    for j, other in nonzero2[p]:
                        out[j] += value * other
        return result
