from typing import List


class Solution:
    def containVirus(self, isInfected: List[List[int]]) -> int:
        # Nothing here is a choice: each day the region whose frontier (the
        # uninfected cells it would reach tonight) is largest gets walled,
        # every other region infects its frontier, and the answer just
        # accumulates the daily wall counts until no frontier is left.
        rows, cols = len(isInfected), len(isInfected[0])
        grid = [row[:] for row in isInfected]
        walls = 0
        while True:
            label = [[-1] * cols for _ in range(rows)]
            regions = []
            for row in range(rows):
                for col in range(cols):
                    if grid[row][col] == 1 and label[row][col] < 0:
                        regions.append(self._measure(grid, label, row, col, len(regions)))
            if not regions:
                return walls
            best = 0
            for i in range(1, len(regions)):
                if len(regions[i][1]) > len(regions[best][1]):
                    best = i
            # No region threatens anything: the outbreak is over, walled or
            # fully spread.
            if not regions[best][1]:
                return walls
            walls += regions[best][2]
            # 2 marks the quarantined region: inert, never spreading again
            # and never part of a later region.
            for row, col in regions[best][0]:
                grid[row][col] = 2
            # The night: everyone else infects their frontier at once. A
            # cell the walled region had threatened still falls to an active
            # region — walls seal only the edges they stand on.
            for i, (_, frontier, _) in enumerate(regions):
                if i != best:
                    for cell in frontier:
                        grid[cell // cols][cell % cols] = 1

    def _measure(self, grid, label, row, col, ident):
        # Walk one region with an explicit stack, collecting its cells, its
        # frontier (distinct threatened 0-cells, encoded row*cols+col) and
        # its wall count — one wall per region/0-cell shared edge.
        rows, cols = len(grid), len(grid[0])
        cells = []
        frontier = set()
        wall_count = 0
        label[row][col] = ident
        stack = [(row, col)]
        while stack:
            r, c = stack.pop()
            cells.append((r, c))
            for nr, nc in ((r - 1, c), (r + 1, c), (r, c - 1), (r, c + 1)):
                if 0 <= nr < rows and 0 <= nc < cols:
                    if grid[nr][nc] == 0:
                        frontier.add(nr * cols + nc)
                        wall_count += 1
                    elif grid[nr][nc] == 1 and label[nr][nc] < 0:
                        label[nr][nc] = ident
                        stack.append((nr, nc))
        return cells, frontier, wall_count
