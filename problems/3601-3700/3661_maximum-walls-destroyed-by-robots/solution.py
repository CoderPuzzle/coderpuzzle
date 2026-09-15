from bisect import bisect_left, bisect_right
from typing import List


class Solution:
    def maxWalls(self, robots: List[int], distance: List[int], walls: List[int]) -> int:
        # Sort robots by position (carrying each range along) and sort the
        # wall positions once: every reachable set below is then counted with
        # two binary searches instead of a scan.
        bots = sorted(zip(robots, distance))
        walls.sort()

        def count(lo: int, hi: int) -> int:
            # How many walls lie in the closed interval [lo, hi].
            if lo > hi:
                return 0
            return bisect_right(walls, hi) - bisect_left(walls, lo)

        def left_lo(i: int) -> int:
            # Firing left the bullet stops at the previous robot; a wall on
            # the blocker's position survives (only the blocker itself can
            # destroy it).
            lo = bots[i][0] - bots[i][1]
            return max(lo, bots[i - 1][0] + 1) if i else lo

        def right_hi(i: int) -> int:
            # Firing right the bullet stops at the next robot.
            hi = bots[i][0] + bots[i][1]
            return min(hi, bots[i + 1][0] - 1) if i + 1 < len(bots) else hi

        # prev_left / prev_right: best totals for the robots already decided
        # when the last of them fired left / right.
        prev_left = count(left_lo(0), bots[0][0])
        prev_right = count(bots[0][0], right_hi(0))
        for i in range(1, len(bots)):
            pos = bots[i][0]
            here_left = count(left_lo(i), pos)
            here_right = count(pos, right_hi(i))
            # Facing shots share the gap: when this robot fires left and the
            # previous one fired right, the walls both bullets reach were
            # already counted and must not count twice.
            shared = count(left_lo(i), min(bots[i - 1][0] + bots[i - 1][1], pos - 1))
            best = max(prev_left, prev_right)
            prev_left = max(prev_left + here_left, prev_right + here_left - shared)
            # A rightward shot can never overlap anything already decided.
            prev_right = best + here_right
        return max(prev_left, prev_right)
