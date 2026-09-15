from typing import List


class Solution:
    def maximumInvitations(self, grid: List[List[int]]) -> int:
        # Maximum bipartite matching: each boy in turn looks for a girl, and
        # when his only choices are taken, an augmenting path asks an earlier
        # boy to reroute — the matched count grows by one exactly when such a
        # path exists.
        m, n = len(grid), len(grid[0])
        invitations = [-1] * n  # girl j is invited by boy invitations[j]

        def invite(boy: int, seen: set) -> bool:
            for girl in range(n):
                if grid[boy][girl] and girl not in seen:
                    seen.add(girl)
                    if invitations[girl] == -1 or invite(invitations[girl], seen):
                        invitations[girl] = boy
                        return True
            return False

        accepted = 0
        for boy in range(m):
            if invite(boy, set()):
                accepted += 1
        return accepted
