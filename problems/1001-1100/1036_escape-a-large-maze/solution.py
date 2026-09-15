from typing import List


class Solution:
    def isEscapePossible(self, blocked: List[List[int]], source: List[int], target: List[int]) -> bool:
        GRID_SIZE = 10**6
        blocked_set = {(x, y) for x, y in blocked}
        # With n blocked cells, the largest pocket they can wall off is the
        # triangular staircase in a grid corner: n * (n - 1) / 2 cells. If a
        # flood-fill from an endpoint ever visits more cells than that, the
        # endpoint cannot be trapped, so the fill can stop early instead of
        # exploring the (unmaterializable) rest of the grid.
        max_enclosed_area = len(blocked_set) * (len(blocked_set) - 1) // 2

        def can_escape_locally(start: List[int], goal: List[int]) -> bool:
            sx, sy = start
            gx, gy = goal
            visited = {(sx, sy)}
            stack = [(sx, sy)]
            while stack:
                if len(visited) > max_enclosed_area:
                    return True
                x, y = stack.pop()
                for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                    if (
                        0 <= nx < GRID_SIZE
                        and 0 <= ny < GRID_SIZE
                        and (nx, ny) not in blocked_set
                        and (nx, ny) not in visited
                    ):
                        if (nx, ny) == (gx, gy):
                            return True
                        visited.add((nx, ny))
                        stack.append((nx, ny))
            return False

        # source cannot reach past its own pocket boundary AND target cannot
        # reach past its own pocket boundary -- both must escape their local
        # neighborhood for a path to exist between them.
        return can_escape_locally(source, target) and can_escape_locally(target, source)
