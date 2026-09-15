from typing import List, Optional

import heapq


class Solution:
    def findShortestWay(self, maze: List[List[int]], ball: List[int], hole: List[int]) -> str:
        m, n = len(maze), len(maze[0])
        ball = (ball[0], ball[1])
        hole = (hole[0], hole[1])
        # Dijkstra over stopping cells, but the hole is a terminal that
        # captures the ball mid-roll. States carry (distance, instructions)
        # and the heap orders by distance first, instruction string second,
        # so the first time the hole pops, its pair is distance-minimal and,
        # among those, lexicographically minimal.
        best = {ball: (0, "")}
        heap = [(0, "", ball)]
        while heap:
            d, path, (r, c) = heapq.heappop(heap)
            if (r, c) == hole:
                return path
            # Stale heap entry (cell was already relaxed smaller): skip.
            if (d, path) > best[(r, c)]:
                continue
            # The "next direction must differ from the last" rule needs no
            # code: the ball stopped against a wall in that direction, so
            # re-choosing it rolls zero cells. Only the hole stops a roll
            # without a wall ahead, and there the game is already over.
            for dr, dc, letter in ((1, 0, "d"), (0, -1, "l"), (0, 1, "r"), (-1, 0, "u")):
                nr, nc = r, c
                steps = 0
                # Roll until the next cell is a wall or border — but
                # stepping onto the hole ends the roll right there: the
                # ball drops in instead of rolling on.
                while 0 <= nr + dr < m and 0 <= nc + dc < n and maze[nr + dr][nc + dc] == 0:
                    nr += dr
                    nc += dc
                    steps += 1
                    if (nr, nc) == hole:
                        break
                if steps:
                    cand = (d + steps, path + letter)
                    # Relax on the (distance, instructions) pair.
                    if cand < best.get((nr, nc), (float("inf"), "")):
                        best[(nr, nc)] = cand
                        heapq.heappush(heap, (cand[0], cand[1], (nr, nc)))
        # Heap exhausted: the ball can never reach the hole.
        return "impossible"
