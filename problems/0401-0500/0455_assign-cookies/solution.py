from typing import List


class Solution:
    def findContentChildren(self, g: List[int], s: List[int]) -> int:
        # Both sorted ascending, the least greedy unfed child faces the
        # smallest unassigned cookie: the cheapest pairing worth trying.
        g.sort()
        s.sort()
        child = 0
        for cookie in s:
            # A cookie too small for the least greedy remaining child is too
            # small for everyone remaining — skip it. Otherwise feed it.
            if child < len(g) and cookie >= g[child]:
                child += 1
        return child
