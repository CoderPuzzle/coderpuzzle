from typing import List, Optional


class Solution:
    def leastBricks(self, wall: List[List[int]]) -> int:
        edge_counts = {}
        # Flip the question: a line at position p crosses a row unless that
        # row has a brick edge at p, so count edges per position.
        for row in wall:
            position = 0
            # Prefix sums excluding the last brick: the final cumulative
            # width is the wall's right border, which is forbidden.
            for width in row[:-1]:
                position += width
                edge_counts[position] = edge_counts.get(position, 0) + 1
        # Rows minus the most-shared edge position; 0 covers walls where
        # every row is a single brick.
        best_edges = max(edge_counts.values(), default=0)
        return len(wall) - best_edges
