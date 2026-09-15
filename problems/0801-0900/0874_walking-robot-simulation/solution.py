from typing import List


class Solution:
    def robotSim(self, commands: List[int], obstacles: List[List[int]]) -> int:
        # Replay the walk exactly as stated: the heading is an index on the
        # four cardinal directions, a turn is one step around that cycle
        # (right +1, left +3, mod 4), and a forward command is unit moves
        # that halt the whole command the moment the next cell is blocked.
        # Obstacles live in a set for constant-time membership, and the
        # answer is the largest x*x + y*y over the whole path in time, not
        # just at the final cell.
        blocked = {(x, y) for x, y in obstacles}
        dx = (0, 1, 0, -1)  # north, east, south, west
        dy = (1, 0, -1, 0)
        x = y = heading = 0
        best = 0
        for command in commands:
            if command == -2:  # turn left
                heading = (heading + 3) % 4
            elif command == -1:  # turn right
                heading = (heading + 1) % 4
            else:
                for _ in range(command):
                    nx, ny = x + dx[heading], y + dy[heading]
                    if (nx, ny) in blocked:
                        break
                    x, y = nx, ny
                    best = max(best, x * x + y * y)
        return best
