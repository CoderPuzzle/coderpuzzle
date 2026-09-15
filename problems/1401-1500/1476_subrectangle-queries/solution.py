from typing import List


class SubrectangleQueries:
    def __init__(self, rectangle: List[List[int]]):
        self.rect = [row[:] for row in rectangle]

    def updateSubrectangle(self, row1: int, col1: int, row2: int, col2: int, newValue: int) -> None:
        for r in range(row1, row2 + 1):
            row = self.rect[r]
            for c in range(col1, col2 + 1):
                row[c] = newValue

    def getValue(self, row: int, col: int) -> int:
        return self.rect[row][col]
