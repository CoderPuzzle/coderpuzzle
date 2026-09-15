from typing import List


class Solution:
    def numMovesStones(self, a: int, b: int, c: int) -> List[int]:
        # Sort into x <= y <= z so the two gaps (empty slots between
        # neighbors) are easy to read off.
        x, y, z = sorted([a, b, c])
        if y - x == 1 and z - y == 1:
            # No empty slots at all: already consecutive.
            return [0, 0]
        # One move suffices whenever a gap is 0 or 1 stone-width wide,
        # since the far stone can jump straight into what remains.
        min_moves = 1 if y - x <= 2 or z - y <= 2 else 2
        # Every move shrinks the spread z - x by exactly 1 in the best
        # case, and the spread must end at 2 (three consecutive values),
        # so the maximum is the total number of empty slots.
        max_moves = z - x - 2
        return [min_moves, max_moves]
