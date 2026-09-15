from typing import List


class Robot:
    def __init__(self, width: int, height: int):
        self.width = width
        self.height = height
        self.perimeter = 2 * (width + height) - 4
        self.index = 0
        self.moved = False

    def step(self, num: int):
        self.index = (self.index + num) % self.perimeter
        self.moved = True

    def getPos(self) -> List[int]:
        if self.index <= self.width - 1:
            return [self.index, 0]
        right_end = self.width + self.height - 2
        if self.index <= right_end:
            return [self.width - 1, self.index - (self.width - 1)]
        top_end = 2 * self.width + self.height - 3
        if self.index <= top_end:
            return [top_end - self.index, self.height - 1]
        return [0, self.perimeter - self.index]

    def getDir(self) -> str:
        if not self.moved:
            return "East"
        if self.index == 0:
            return "South"
        if self.index <= self.width - 1:
            return "East"
        if self.index <= self.width + self.height - 2:
            return "North"
        if self.index <= 2 * self.width + self.height - 3:
            return "West"
        return "South"
