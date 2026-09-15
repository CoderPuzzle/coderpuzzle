from typing import List, Optional


class Solution:
    def convert(self, s: str, numRows: int) -> str:
        # One row never turns (the direction flag below could never flip),
        # and a grid taller than the text is a single pass down: either way
        # the zigzag is the string itself.
        if numRows == 1 or numRows >= len(s):
            return s
        rows = [[] for _ in range(numRows)]
        # Walk the string once, tracking the current row and direction;
        # reverse exactly at the top and bottom rows, where the zigzag turns.
        index, step = 0, -1
        for ch in s:
            rows[index].append(ch)
            if index == 0:
                step = 1
            elif index == numRows - 1:
                step = -1
            index += step
        # Reading the rows top to bottom is the conversion.
        return "".join("".join(row) for row in rows)
