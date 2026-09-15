from typing import List


class Solution:
    def findCenter(self, edges: List[List[int]]) -> int:
        # The center lies on every edge, so it is the one node shared by
        # the first two edges; every other node occurs in exactly one edge.
        a, b = edges[0]
        c, d = edges[1]
        if a == c or a == d:
            return a
        return b
