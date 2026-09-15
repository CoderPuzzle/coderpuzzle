from bisect import bisect_left
from typing import List


class Solution:
    def maxPathLength(self, coordinates: List[List[int]], k: int) -> int:
        pivot_x, pivot_y = coordinates[k]

        def longest_chain(points: List[List[int]]) -> int:
            points.sort(key=lambda point: (point[0], -point[1]))
            tails: List[int] = []
            for _, y in points:
                index = bisect_left(tails, y)
                if index == len(tails):
                    tails.append(y)
                else:
                    tails[index] = y
            return len(tails)

        below = [point for point in coordinates if point[0] < pivot_x and point[1] < pivot_y]
        above = [point for point in coordinates if point[0] > pivot_x and point[1] > pivot_y]
        return 1 + longest_chain(below) + longest_chain(above)
