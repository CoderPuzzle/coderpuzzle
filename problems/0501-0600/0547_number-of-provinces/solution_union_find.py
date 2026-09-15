from typing import List, Optional


class Solution:
    def findCircleNum(self, isConnected: List[List[int]]) -> int:
        n = len(isConnected)
        parent = list(range(n))

        # Path-halving: splice every other node directly under its
        # grandparent, flattening the tree while walking to the root.
        def find(x):
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        # Every city begins as its own province; only a
        # successful union ever reduces the count.
        provinces = n
        # The matrix is symmetric, so scanning pairs i < j feeds every
        # road to the union exactly once; the diagonal is skipped.
        for i in range(n):
            for j in range(i + 1, n):
                if isConnected[i][j] == 1:
                    ri, rj = find(i), find(j)
                    # A road joining two distinct roots merges two provinces;
                    # one whose cities already share a root is redundant.
                    if ri != rj:
                        parent[ri] = rj
                        provinces -= 1
        return provinces
