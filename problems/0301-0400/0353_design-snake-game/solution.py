from collections import deque
from typing import Deque, List, Set, Tuple


class SnakeGame:
    """The body as a deque (head at the front, tail at the back) plus a
    set of the cells it covers.

    `move` pushes the new head on and — unless food is eaten — pops the
    tail in the same step, so the snake slides forward exactly one cell;
    the set answers the body-collision question in constant time.
    """

    OFFSETS = {"U": (-1, 0), "D": (1, 0), "L": (0, -1), "R": (0, 1)}

    def __init__(self, width: int, height: int, food: List[List[int]]) -> None:
        self.width = width
        self.height = height
        self.food: List[Tuple[int, int]] = [(row, col) for row, col in food]
        self.next_food = 0
        self.score = 0
        self.body: Deque[Tuple[int, int]] = deque([(0, 0)])
        self.occupied: Set[Tuple[int, int]] = {(0, 0)}

    def move(self, direction: str) -> int:
        row_offset, col_offset = self.OFFSETS[direction]
        head_row, head_col = self.body[0]
        new_head = (head_row + row_offset, head_col + col_offset)
        row, col = new_head
        if not (0 <= row < self.height and 0 <= col < self.width):
            return -1
        eating = self.next_food < len(self.food) and self.food[self.next_food] == new_head
        if not eating:
            # The tail vacates its cell in this very step, so a head
            # landing on the CURRENT tail position is legal.
            self.occupied.remove(self.body.pop())
        if new_head in self.occupied:
            return -1
        self.body.appendleft(new_head)
        self.occupied.add(new_head)
        if eating:
            self.next_food += 1
            self.score += 1
        return self.score
