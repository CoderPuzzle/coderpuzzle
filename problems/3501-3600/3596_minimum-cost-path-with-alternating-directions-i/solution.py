class Solution:
    def minCost(self, m: int, n: int) -> int:
        # From (0,0) every odd move goes to (0,1) or (1,0), and the forced
        # even move walks straight back (left/up leaves the grid otherwise),
        # so the walk is confined to {(0,0), (0,1), (1,0)} in any grid.
        # Only three destinations are therefore reachable.
        if m == 1 and n == 1:
            return 1
        if (m == 1 and n == 2) or (m == 2 and n == 1):
            # 1 for entering (0,0) plus 2 for entering the neighbor.
            return 3
        return -1
