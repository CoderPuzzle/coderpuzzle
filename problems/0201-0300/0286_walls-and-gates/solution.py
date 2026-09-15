from typing import List, Optional


class Solution:
    def wallsAndGates(self, rooms: List[List[int]]) -> List[List[int]]:
        from collections import deque

        m, n = len(rooms), len(rooms[0])
        INF = 2147483647
        # Invert the search: seed the queue with every gate at once and run
        # one BFS outward, rather than searching from each empty room.
        queue = deque((r, c) for r in range(m) for c in range(n) if rooms[r][c] == 0)
        dist = 0
        while queue:
            # Expand one whole layer per step: every distance-d cell is found
            # before any d+1 cell is labeled, which is what keeps distances
            # minimal (first reach = shortest path from some gate).
            dist += 1
            for _ in range(len(queue)):
                r, c = queue.popleft()
                for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    nr, nc = r + dr, c + dc
                    # Still INF means unvisited; writing the distance doubles
                    # as the visited mark, and walls/gates never match INF so
                    # they are never entered or overwritten.
                    if 0 <= nr < m and 0 <= nc < n and rooms[nr][nc] == INF:
                        rooms[nr][nc] = dist
                        queue.append((nr, nc))
        return rooms
