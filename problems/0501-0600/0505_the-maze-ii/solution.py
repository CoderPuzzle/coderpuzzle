from typing import List, Optional

import heapq


class Solution:
    def shortestDistance(self, maze: List[List[int]], start: List[int], destination: List[int]) -> int:
        m, n = len(maze), len(maze[0])
        start = (start[0], start[1])
        destination = (destination[0], destination[1])
        # Dijkstra over stopping cells — positions where the ball halts
        # against a wall/border. Roll distances vary, so BFS won't do.
        dist = {start: 0}
        heap = [(0, start)]
        while heap:
            d, (r, c) = heapq.heappop(heap)
            # Dijkstra settles cells in distance order: destination popped
            # => its distance is final.
            if (r, c) == destination:
                return d
            # Stale heap entry (cell was already relaxed lower): skip.
            if d > dist.get((r, c), d):
                continue
            for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nr, nc = r, c
                steps = 0
                # Roll step by step until the next cell is a wall or out of
                # bounds; the landing cell is the neighbor, steps the edge
                # weight. Passing over a cell doesn't create a node — only
                # stopping on it does.
                while 0 <= nr + dr < m and 0 <= nc + dc < n and maze[nr + dr][nc + dc] == 0:
                    nr += dr
                    nc += dc
                    steps += 1
                if steps:
                    nd = d + steps
                    # Relax only when the roll improves the landing cell.
                    if nd < dist.get((nr, nc), float("inf")):
                        dist[(nr, nc)] = nd
                        heapq.heappush(heap, (nd, (nr, nc)))
        # Heap exhausted: the ball can never stop on the destination.
        return -1
