from typing import List


class Solution:
    def findPath(self, grid: List[List[int]], k: int) -> List[List[int]]:
        # Backtrack over the walk, entering waypoint w only as the (w)-th
        # waypoint. Two prunes keep the 5x5 worst case instant: the
        # remaining cells must still balance by color (the walk strictly
        # alternates colors), and the unvisited region must stay connected.
        m, n = len(grid), len(grid[0])
        total = m * n
        visited = [[False] * n for _ in range(m)]
        remaining = [0, 0]  # cells left, indexed by (row + col) % 2
        for r in range(m):
            for c in range(n):
                remaining[(r + c) % 2] += 1
        path = []

        def connected():
            cells = [(r, c) for r in range(m) for c in range(n) if not visited[r][c]]
            if not cells:
                return True
            seen = {cells[0]}
            stack = [cells[0]]
            while stack:
                r, c = stack.pop()
                for dr, dc in ((-1, 0), (1, 0), (0, -1), (0, 1)):
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < m and 0 <= nc < n and not visited[nr][nc] and (nr, nc) not in seen:
                        seen.add((nr, nc))
                        stack.append((nr, nc))
            return len(seen) == len(cells)

        def dfs(r: int, c: int, count: int, nxt: int) -> bool:
            value = grid[r][c]
            if value != 0 and value != nxt:
                return False
            visited[r][c] = True
            path.append([r, c])
            if value == nxt:
                nxt += 1
            count += 1
            color = (r + c) % 2
            remaining[color] -= 1
            ok = False
            if count == total:
                ok = True
            else:
                left = total - count
                # The rest of the walk alternates colors, starting on the
                # opposite color of the current cell.
                if remaining[1 - color] == (left + 1) // 2 and remaining[color] == left // 2 and connected():
                    for dr, dc in ((-1, 0), (1, 0), (0, -1), (0, 1)):
                        nr, nc = r + dr, c + dc
                        if 0 <= nr < m and 0 <= nc < n and not visited[nr][nc]:
                            if dfs(nr, nc, count, nxt):
                                ok = True
                                break
            if not ok:
                visited[r][c] = False
                path.pop()
            remaining[color] += 1
            return ok

        for r in range(m):
            for c in range(n):
                if grid[r][c] in (0, 1) and dfs(r, c, 0, 1):
                    return path
        return []
