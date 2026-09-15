from typing import List


class Solution:
    def findColumnWidth(self, grid: List[List[int]]) -> List[int]:
        # Width of a value = digits of its magnitude plus one sign character
        # when negative. Repeated division by 10 counts the digits without
        # materializing strings, and every column keeps a running maximum.
        def length(value: int) -> int:
            width = 1 if value < 0 else 0
            rest = -value if value < 0 else value
            while True:
                width += 1
                rest //= 10
                if rest == 0:
                    return width

        widths = [0] * len(grid[0])
        for row in grid:
            for column, value in enumerate(row):
                widths[column] = max(widths[column], length(value))
        return widths
